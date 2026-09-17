import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Sparkles, Compass, ShieldCheck, Play, Pause, Gem, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 100;
const CACHE_NAME = 'krean-diamond-sequence-v1';

// Persistent module-level in-memory cache to prevent re-fetching across renders
const diamondMemoryCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

// Helper to fetch or read from browser Cache API, decode, and store into memory cache
async function getCachedOrFetchFrame(
  frameIndex: number,
  cache: Cache | null
): Promise<HTMLImageElement> {
  // 1. Check memory cache first (instant 0ms)
  const existing = diamondMemoryCache[frameIndex];
  if (existing && existing.complete && existing.naturalWidth > 0) {
    return existing;
  }

  const frameNum = String(frameIndex).padStart(3, '0');
  const url = `/diamond-sequence/frame_${frameNum}.webp`;
  const img = new Image();

  try {
    let blobUrl: string | null = null;

    // 2. Check Browser Cache API (persistent storage across page reloads/sessions)
    if (cache) {
      try {
        const cachedResponse = await cache.match(url);
        if (cachedResponse && cachedResponse.ok) {
          const blob = await cachedResponse.blob();
          blobUrl = URL.createObjectURL(blob);
        } else {
          // Fetch from network and store a clone in Cache API
          const networkResponse = await fetch(url);
          if (networkResponse.ok) {
            cache.put(url, networkResponse.clone()).catch(() => {});
            const blob = await networkResponse.blob();
            blobUrl = URL.createObjectURL(blob);
          }
        }
      } catch {
        blobUrl = null;
      }
    }

    img.src = blobUrl || url;

    // 3. Pre-decode image into GPU raster memory to eliminate jank & flicker
    try {
      if (typeof img.decode === 'function') {
        await img.decode();
      } else {
        await new Promise<void>((resolve) => {
          const el = img as HTMLImageElement;
          if (el.complete) return resolve();
          el.onload = () => resolve();
          el.onerror = () => resolve();
        });
      }
    } catch {
      // Decode errors ignored safely
    }

    diamondMemoryCache[frameIndex] = img;
    return img;
  } catch {
    img.src = url;
    diamondMemoryCache[frameIndex] = img;
    return img;
  }
}

export const DiamondScrubber: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(diamondMemoryCache);
  
  // Initial count from memory cache if already populated
  const initialLoadedCount = diamondMemoryCache.filter(
    (img) => img && img.complete && img.naturalWidth > 0
  ).length;

  const [loadedCount, setLoadedCount] = useState(initialLoadedCount);
  const [displayDegrees, setDisplayDegrees] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Animation & Physics Refs
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const isAutoSpinningRef = useRef<boolean>(true);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const drawFrameRef = useRef<(frameIdx: number) => void>(() => {});

  // Sync state refs for animation loop
  useEffect(() => {
    isAutoSpinningRef.current = isAutoSpinning;
  }, [isAutoSpinning]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // 1. Dual-Tier Preload (Memory Cache + Browser Cache API) with Immediate Frame 0 Render
  useEffect(() => {
    let isMounted = true;

    const initSequenceCache = async () => {
      // Check if memory cache already has frames
      const cachedCount = diamondMemoryCache.filter((img) => img && img.complete).length;
      if (cachedCount === TOTAL_FRAMES) {
        imagesRef.current = [...diamondMemoryCache];
        setLoadedCount(TOTAL_FRAMES);
        drawFrameRef.current(0);
        return;
      }

      // Open Browser Cache API
      let cache: Cache | null = null;
      if (typeof window !== 'undefined' && 'caches' in window) {
        try {
          cache = await caches.open(CACHE_NAME);
        } catch {
          cache = null;
        }
      }

      if (!isMounted) return;

      // Priority 1: Instant load of Frame 0 to paint canvas immediately
      const frame0 = await getCachedOrFetchFrame(0, cache);
      if (isMounted) {
        imagesRef.current[0] = frame0;
        setLoadedCount((prev) => Math.max(prev, 1));
        drawFrameRef.current(0);
      }

      // Priority 2: Stream remaining 99 frames via concurrent pool (concurrency: 6)
      const remainingIndices: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!diamondMemoryCache[i] || !diamondMemoryCache[i]?.complete) {
          remainingIndices.push(i);
        } else {
          imagesRef.current[i] = diamondMemoryCache[i];
        }
      }

      let completedCount = TOTAL_FRAMES - remainingIndices.length;
      if (isMounted) {
        setLoadedCount(completedCount);
      }

      const CONCURRENCY = 6;
      const poolWorker = async () => {
        while (remainingIndices.length > 0 && isMounted) {
          const idx = remainingIndices.shift();
          if (idx === undefined) break;

          try {
            const loadedImg = await getCachedOrFetchFrame(idx, cache);
            if (isMounted) {
              imagesRef.current[idx] = loadedImg;
              completedCount++;
              setLoadedCount(completedCount);
            }
          } catch {
            if (isMounted) {
              completedCount++;
              setLoadedCount(completedCount);
            }
          }
        }
      };

      const workers = Array.from({ length: Math.min(CONCURRENCY, remainingIndices.length || 1) }, () =>
        poolWorker()
      );
      await Promise.all(workers);

      if (isMounted) {
        setLoadedCount(TOTAL_FRAMES);
      }
    };

    initSequenceCache();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-performance canvas drawing helper with memory cache fallback
  const drawFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let safeIdx = Math.round(frameIdx) % TOTAL_FRAMES;
    if (safeIdx < 0) safeIdx += TOTAL_FRAMES;

    let img = imagesRef.current[safeIdx] || diamondMemoryCache[safeIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 15; offset++) {
        const prev = (safeIdx - offset + TOTAL_FRAMES) % TOTAL_FRAMES;
        const next = (safeIdx + offset) % TOTAL_FRAMES;
        const prevImg = imagesRef.current[prev] || diamondMemoryCache[prev];
        if (prevImg?.complete && prevImg?.naturalWidth) {
          img = prevImg;
          break;
        }
        const nextImg = imagesRef.current[next] || diamondMemoryCache[next];
        if (nextImg?.complete && nextImg?.naturalWidth) {
          img = nextImg;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (width - w) / 2;
    const y = (height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  drawFrameRef.current = drawFrameToCanvas;

  // 3. Canvas Resizing (Background sizing)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Large atmospheric background dimension
      const availableWidth = Math.min(window.innerWidth, 850);
      const displaySize = Math.max(340, availableWidth);

      canvas.width = displaySize * dpr;
      canvas.height = displaySize * dpr;
      canvas.style.width = `${displaySize}px`;
      canvas.style.height = `${displaySize}px`;

      lastDrawnFrameRef.current = -1;
      drawFrameToCanvas(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrameToCanvas]);

  // 4. Smooth Ambient Animation Loop (Auto-orbit & Drag Lerp)
  useEffect(() => {
    let animId: number;

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = Math.min(time - lastTimeRef.current, 100);
      lastTimeRef.current = time;

      // Auto-spin in the background (~15 seconds per rotation)
      if (isAutoSpinningRef.current && !isDraggingRef.current) {
        const framesToAdvance = (deltaTime / 1000) * 6.6;
        targetFrameRef.current = (targetFrameRef.current + framesToAdvance) % TOTAL_FRAMES;
        currentFrameRef.current = targetFrameRef.current;
      } else if (isDraggingRef.current) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        let diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * 0.15;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      drawFrameToCanvas(frameToDraw);

      const normalizedFrame = ((frameToDraw % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
      const degrees = Math.round((normalizedFrame / TOTAL_FRAMES) * 360);
      setDisplayDegrees(degrees);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [drawFrameToCanvas]);

  // 5. Interactive Drag Handlers (Allows user to spin the background stone freely)
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    dragStartXRef.current = clientX;
    dragStartFrameRef.current = targetFrameRef.current;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - dragStartXRef.current;
    const framesDelta = -(deltaX / 5);
    targetFrameRef.current = ((dragStartFrameRef.current + framesDelta) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const scrollToCatalog = () => {
    const elem = document.getElementById('calibrated-diamonds-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="diamond-showcase-section"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 min-h-[700px] flex items-center justify-center bg-[#070707] text-[#f4f2ee] overflow-hidden border-b border-[#1c1914] select-none"
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseMove={(e) => handlePointerMove(e.clientX)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
      onTouchEnd={handlePointerUp}
    >
      {/* 1. Ambient Background 360° Diamond Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 md:opacity-90 transition-opacity duration-1000">
        {/* Radial Champagne Glow behind diamond */}
        <div className="absolute w-[450px] md:w-[650px] h-[450px] md:h-[650px] rounded-full bg-gradient-to-tr from-[#c9a86a]/12 via-[#a17a3a]/8 to-transparent blur-3xl pointer-events-none" />
        
        {/* Diamond Canvas */}
        <canvas
          ref={canvasRef}
          id="diamond-ambient-canvas"
          className="relative z-0 max-w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105 cursor-grab active:cursor-grabbing pointer-events-auto"
          title="Drag horizontally to rotate 360°"
        />

        {/* Subtle Vignette overlay to keep foreground text ultra-crisp */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center,_transparent_40%,_#070707_92%] pointer-events-none" />
      </div>

      {/* 2. Crisp, Airy Luxury Typography & Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-between min-h-[500px]">
        
        {/* Top Eyebrow & Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a86a]/30 bg-black/60 backdrop-blur-md text-[#c9a86a] text-[10px] tracking-[0.35em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Atelier 360° Optical Scintillation</span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#f4f2ee] font-normal tracking-[0.03em] max-w-4xl leading-tight">
            Grown for Fire. Cut with Absolute Precision.
          </h2>

          <p className="text-xs sm:text-sm text-[#a8a396] max-w-2xl mx-auto font-light leading-relaxed">
            Every lab-grown diamond is synthesized under pristine vacuum plasma reactors and hand-faceted to 0.01° angular tolerances, unlocking maximum fire, brilliance, and scintillation.
          </p>
        </div>

        {/* Center: Interactive Rotation Cue & Subtle Orbit Controls */}
        <div className="my-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-[#2a241a] text-xs shadow-2xl">
            <button
              onClick={() => setIsAutoSpinning((prev) => !prev)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#c9a86a] hover:text-[#faebd7] transition-colors cursor-pointer"
            >
              {isAutoSpinning ? (
                <>
                  <Pause className="w-3 h-3 text-[#c9a86a]" />
                  <span>Orbiting</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#c9a86a]" />
                  <span>Auto-Orbit</span>
                </>
              )}
            </button>

            <span className="text-[#3a3429]">&bull;</span>

            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#ded8cc]">
              {displayDegrees}° Inspection
            </span>

            <span className="text-[#3a3429]">&bull;</span>

            <span className="text-[9px] uppercase tracking-wider text-[#8e8a80] hidden sm:inline">
              Drag stone to orbit
            </span>
          </div>
        </div>

        {/* Bottom Tier: 3 Spacious Luxury Pillars & Quick Shop Button */}
        <div className="w-full space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            
            <div className="p-4 rounded-sm bg-black/40 backdrop-blur-sm border border-[#1f1c16] flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-mono">
                Type IIa Purity
              </span>
              <span className="text-xs text-[#ded8cc] mt-1 font-light">
                Apex 1% Chemical Purity
              </span>
            </div>

            <div className="p-4 rounded-sm bg-black/40 backdrop-blur-sm border border-[#1f1c16] flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-mono">
                Triple Excellent
              </span>
              <span className="text-xs text-[#ded8cc] mt-1 font-light">
                Ideal Cut &amp; Symmetry
              </span>
            </div>

            <div className="p-4 rounded-sm bg-black/40 backdrop-blur-sm border border-[#1f1c16] flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-mono">
                IGI &amp; HRD Certified
              </span>
              <span className="text-xs text-[#ded8cc] mt-1 font-light">
                Laser Inscribed Serial Number
              </span>
            </div>

          </div>

          <div>
            <button
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs tracking-[0.22em] uppercase border border-[#c9a86a] bg-[#c9a86a] text-[#070707] hover:bg-[#e2c786] transition-all duration-300 font-semibold cursor-pointer shadow-lg"
            >
              <span>Explore KREAN JEWELS Master Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DiamondScrubber;
