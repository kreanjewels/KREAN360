import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Sparkles, Compass, ShieldCheck } from 'lucide-react';

const TOTAL_FRAMES = 100;
const CACHE_NAME = 'krean-diamond-sequence-v1';

// Persistent module-level in-memory cache to prevent re-fetching and GC churn across renders/scrolls
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

    // 3. Pre-decode image into GPU raster memory to eliminate jank & flicker on rapid scroll
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
      // Decode errors or unsupported environments ignore safely
    }

    diamondMemoryCache[frameIndex] = img;
    return img;
  } catch {
    // Graceful fallback
    img.src = url;
    diamondMemoryCache[frameIndex] = img;
    return img;
  }
}

export const DiamondScrubber: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(diamondMemoryCache);
  
  // Calculate initial count from memory cache if already populated
  const initialLoadedCount = diamondMemoryCache.filter(
    (img) => img && img.complete && img.naturalWidth > 0
  ).length;

  const [loadedCount, setLoadedCount] = useState(initialLoadedCount);
  const [hasFadedOut, setHasFadedOut] = useState(initialLoadedCount >= TOTAL_FRAMES);
  const [displayDegrees, setDisplayDegrees] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Animation & Physics Refs
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const isAutoSpinningRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const drawFrameRef = useRef<(frameIdx: number) => void>(() => {});

  // Fade out loader smoothly once all 100 frames are cached
  useEffect(() => {
    if (loadedCount >= TOTAL_FRAMES) {
      const timer = setTimeout(() => {
        setHasFadedOut(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [loadedCount]);

  // Sync state refs for animation loop
  isAutoSpinningRef.current = isAutoSpinning;
  isDraggingRef.current = isDragging;

  // 1. Dual-Tier Preload (Memory Cache + Browser Cache API) with Immediate Frame 0 Render
  useEffect(() => {
    let isMounted = true;

    const initSequenceCache = async () => {
      // If memory cache is already 100% warm, apply immediately
      const warmCount = diamondMemoryCache.filter(
        (img) => img && img.complete && img.naturalWidth > 0
      ).length;

      if (warmCount >= TOTAL_FRAMES) {
        imagesRef.current = [...diamondMemoryCache];
        setLoadedCount(TOTAL_FRAMES);
        setHasFadedOut(true);
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

    // Wrap around 0..99
    let safeIdx = Math.round(frameIdx) % TOTAL_FRAMES;
    if (safeIdx < 0) safeIdx += TOTAL_FRAMES;

    // Find nearest loaded image if current isn't ready
    let img = imagesRef.current[safeIdx] || diamondMemoryCache[safeIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback search to closest loaded frame in memory
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

    // Only draw if different from last drawn
    if (lastDrawnFrameRef.current === safeIdx) return;
    lastDrawnFrameRef.current = safeIdx;

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

  // 3. Canvas Resizing (ONLY on mount or window resize, NEVER on frame update)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Clean responsive bounding box
      const availableWidth = Math.min(window.innerWidth - 32, 600);
      const displaySize = Math.max(280, availableWidth);

      canvas.width = displaySize * dpr;
      canvas.height = displaySize * dpr;
      canvas.style.width = `${displaySize}px`;
      canvas.style.height = `${displaySize}px`;

      // Force redraw current frame after size change
      lastDrawnFrameRef.current = -1;
      drawFrameToCanvas(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrameToCanvas]);

  // 4. Smooth Animation Loop (Handles Lerping, Auto-spin & Smooth Interpolation)
  useEffect(() => {
    let animId: number;

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = Math.min(time - lastTimeRef.current, 100); // clamp delta
      lastTimeRef.current = time;

      // A. If Auto-spinning at majestic luxury speed (~14 seconds per full rotation)
      if (isAutoSpinningRef.current && !isDraggingRef.current) {
        // ~7 frames per second = ~14.2 seconds for 100 frames
        const framesToAdvance = (deltaTime / 1000) * 7.0;
        targetFrameRef.current = (targetFrameRef.current + framesToAdvance) % TOTAL_FRAMES;
        currentFrameRef.current = targetFrameRef.current;
      } 
      // B. If Dragging, targetFrame is updated by pointer moves directly
      else if (isDraggingRef.current) {
        currentFrameRef.current = targetFrameRef.current;
      }
      // C. If scrolling, gently interpolate toward targetFrame with damping
      else {
        let diff = targetFrameRef.current - currentFrameRef.current;
        // Smooth lerp (0.15 factor gives responsive yet buttery feel)
        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * 0.15;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      // Draw active frame
      const frameToDraw = Math.round(currentFrameRef.current);
      drawFrameToCanvas(frameToDraw);

      // Update UI degrees readout smoothly
      const normalizedFrame = ((frameToDraw % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
      const degrees = Math.round((normalizedFrame / TOTAL_FRAMES) * 360);
      setDisplayDegrees(degrees);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [drawFrameToCanvas]);

  // 5. Scroll Mapping with Calibrated Pace
  useEffect(() => {
    const handleScroll = () => {
      // If user is actively dragging or in auto-spin, scroll doesn't override
      if (isDraggingRef.current || isAutoSpinningRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = container.offsetHeight - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      // Calculate progress 0 to 1 inside the pinned area
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));

      setScrollProgress(progress);

      // Map progress to 0..99 frames smoothly across the full scroll distance
      const mappedFrame = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = mappedFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Tactile & Weighty Mouse/Touch Drag Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = currentFrameRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    
    // Tactile precision: 16px of horizontal drag = 1 frame
    // This gives luxurious, weighted, smooth control
    const frameDelta = deltaX / 16;
    let newFrame = (dragStartFrameRef.current + frameDelta) % TOTAL_FRAMES;
    if (newFrame < 0) newFrame += TOTAL_FRAMES;

    targetFrameRef.current = newFrame;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Scrollytelling story beats based on progress
  const beat = scrollProgress < 0.35 ? 1 : scrollProgress < 0.70 ? 2 : 3;

  return (
    <div
      ref={containerRef}
      id="diamond-turntable-section"
      className="relative w-full h-[320vh] bg-[#080808]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-between py-10 md:py-14 px-6 overflow-hidden select-none">
        
        {/* Subtle background ambient gold light */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_rgba(201,168,106,0.06)_0%,_transparent_65%] pointer-events-none" />

        {/* Section Top Header & Degrees Indicator */}
        <div className="relative z-10 w-full max-w-6xl flex items-center justify-between text-xs tracking-[0.22em] uppercase text-[#7a756b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c9a86a]" />
            <span className="text-[#dcd7cc] font-medium">360° Diamond Turntable</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[#c9a86a] text-xs">
              {displayDegrees}° Facet Angle
            </span>
            <button
              onClick={() => {
                const nextState = !isAutoSpinning;
                setIsAutoSpinning(nextState);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] tracking-widest transition-all cursor-pointer ${
                isAutoSpinning 
                  ? 'border-[#c9a86a] text-[#080808] bg-[#c9a86a] font-medium shadow-[0_0_12px_rgba(201,168,106,0.4)]' 
                  : 'border-[#332e24] text-[#8e8a80] hover:text-[#f4f2ee] hover:border-[#c9a86a]/50'
              }`}
              title="Toggle slow luxury auto-orbit"
            >
              <RotateCw className={`w-3 h-3 ${isAutoSpinning ? 'animate-spin' : ''}`} />
              <span>{isAutoSpinning ? 'Orbiting (Calm)' : 'Auto Orbit'}</span>
            </button>
          </div>
        </div>

        {/* Center: Interactive Rotating Diamond Canvas */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          
          {/* Canvas Wrapper with tactile touch-action none */}
          <div
            className="relative cursor-grab active:cursor-grabbing group touch-none select-none flex items-center justify-center"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Glowing ring behind diamond */}
            <div className="absolute inset-0 rounded-full bg-radial-[circle,_rgba(201,168,106,0.08)_0%,_transparent_70%] scale-110 pointer-events-none" />

            {/* Subtle, Elegant Loading Skeleton & Circular Progress Indicator */}
            {!hasFadedOut && (
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 transition-opacity duration-1000 ${
                  loadedCount >= TOTAL_FRAMES ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {/* SVG Skeleton Wireframe + Circular Progress Arc */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 max-w-full aspect-square flex items-center justify-center">
                  
                  {/* Subtle golden ambient glow pulse during initial loading */}
                  <div className="absolute inset-4 rounded-full bg-radial-[circle_at_center,_rgba(201,168,106,0.06)_0%,_transparent_65%] animate-pulse" />

                  <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_0_15px_rgba(201,168,106,0.15)]">
                    <defs>
                      <linearGradient id="scrubberGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f5e6c8" />
                        <stop offset="50%" stopColor="#c9a86a" />
                        <stop offset="100%" stopColor="#876b38" />
                      </linearGradient>
                      <linearGradient id="shimmerFacetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c9a86a" stopOpacity="0.04" />
                        <stop offset="50%" stopColor="#c9a86a" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#c9a86a" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>

                    {/* Outer Bezel Ticks (12 Fine Markers like a luxury chronograph) */}
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const angle = (idx * 30) * (Math.PI / 180);
                      const r1 = 104;
                      const r2 = 108;
                      const x1 = 120 + r1 * Math.cos(angle);
                      const y1 = 120 + r1 * Math.sin(angle);
                      const x2 = 120 + r2 * Math.cos(angle);
                      const y2 = 120 + r2 * Math.sin(angle);
                      return (
                        <line
                          key={idx}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#c9a86a"
                          strokeOpacity="0.3"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Circular Track */}
                    <circle
                      cx="120"
                      cy="120"
                      r="106"
                      fill="none"
                      stroke="#1a1712"
                      strokeWidth="1.5"
                    />

                    {/* Animated Golden Progress Arc */}
                    <circle
                      cx="120"
                      cy="120"
                      r="106"
                      fill="none"
                      stroke="url(#scrubberGoldGrad)"
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 106}
                      strokeDashoffset={2 * Math.PI * 106 * (1 - Math.max(loadedCount, 1) / TOTAL_FRAMES)}
                      strokeLinecap="round"
                      className="transition-all duration-300 ease-out -rotate-90 origin-center"
                    />

                    {/* Diamond Wireframe Skeleton (visible while initial frames load, dissolves once frames take over) */}
                    <g
                      className={`transition-opacity duration-700 ${
                        loadedCount >= 8 ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      {/* Table facet */}
                      <polygon
                        points="84,86 156,86 182,112 58,112"
                        fill="url(#shimmerFacetGrad)"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.55"
                      />
                      {/* Crown facet triangles */}
                      <polygon
                        points="84,86 120,112 156,86"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                      />
                      <polygon
                        points="58,112 84,86 92,112"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.35"
                      />
                      <polygon
                        points="182,112 156,86 148,112"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.35"
                      />

                      {/* Girdle Line */}
                      <line
                        x1="58"
                        y1="112"
                        x2="182"
                        y2="112"
                        stroke="#c9a86a"
                        strokeWidth="1.2"
                        strokeOpacity="0.75"
                      />

                      {/* Pavilion facets converging to Culet at (120, 178) */}
                      <polygon
                        points="58,112 120,178 92,112"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                      />
                      <polygon
                        points="92,112 120,178 120,112"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.5"
                      />
                      <polygon
                        points="120,112 120,178 148,112"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.5"
                      />
                      <polygon
                        points="148,112 120,178 182,112"
                        fill="none"
                        stroke="#c9a86a"
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                      />

                      {/* Culet point */}
                      <circle cx="120" cy="178" r="1.5" fill="#c9a86a" opacity="0.9" />
                    </g>
                  </svg>

                  {/* Centered micro-readout when wireframe is visible */}
                  {loadedCount < 8 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-20">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-mono">
                        {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#8e8a80] mt-0.5">
                        Calibrating
                      </span>
                    </div>
                  )}

                  {/* Floating Indicator Capsule at Bottom of Ring */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-[#262016] shadow-2xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a86a] animate-pulse" />
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#c9a86a] font-mono">
                        {loadedCount < TOTAL_FRAMES
                          ? `Buffering 360° Sequence • ${loadedCount}%`
                          : '100% Calibrated • Ready to Orbit'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              id="diamond-scrub-canvas"
              className="relative z-10 max-w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
            />

            {/* Hint overlay on hover */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#2a2620] text-[9px] uppercase tracking-[0.25em] text-[#8e8a80] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Drag horizontally or scroll slowly to orbit
            </div>
          </div>
        </div>

        {/* Dynamic Scrollytelling Beat Headline & Copy Overlaid Bottom */}
        <div className="relative z-10 w-full max-w-3xl text-center min-h-[140px] flex flex-col items-center justify-center">
          
          {/* Beat 1 */}
          <div 
            className={`transition-all duration-700 absolute inset-x-0 flex flex-col items-center ${
              beat === 1 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a86a] font-light mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Optical Architecture</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light tracking-tight">
              Brilliance, Engineered.
            </h2>
            <p className="text-xs sm:text-sm text-[#9f9a8f] max-w-xl mt-3 font-light leading-relaxed">
              Every facet is calculated to return maximum light. 58 facets sculpted in complete crystalline symmetry for total internal reflection.
            </p>
          </div>

          {/* Beat 2 */}
          <div 
            className={`transition-all duration-700 absolute inset-x-0 flex flex-col items-center ${
              beat === 2 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a86a] font-light mb-2">
              <Compass className="w-3 h-3" />
              <span>Atomic Perfection</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light tracking-tight">
              Type IIa Crystalline Purity.
            </h2>
            <p className="text-xs sm:text-sm text-[#9f9a8f] max-w-xl mt-3 font-light leading-relaxed">
              Chemically pristine carbon. Free from the nitrogen impurities that plague 98% of natural mined diamonds, producing unmatched transparency.
            </p>
          </div>

          {/* Beat 3 */}
          <div 
            className={`transition-all duration-700 absolute inset-x-0 flex flex-col items-center ${
              beat === 3 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a86a] font-light mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>Certified Fire</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light tracking-tight">
              Certified. Traceable. Timeless.
            </h2>
            <p className="text-xs sm:text-sm text-[#9f9a8f] max-w-xl mt-3 font-light leading-relaxed">
              Independently graded by IGI and HRD Antwerp with micro-laser girdle inscriptions confirming ethical origin from crystal to crown.
            </p>
          </div>
        </div>

        {/* Bottom Pinned Stepper indicator */}
        <div className="relative z-10 flex items-center gap-3 mt-4">
          <div className={`w-8 h-[2px] transition-all duration-300 ${beat === 1 ? 'bg-[#c9a86a]' : 'bg-[#26221a]'}`} />
          <div className={`w-8 h-[2px] transition-all duration-300 ${beat === 2 ? 'bg-[#c9a86a]' : 'bg-[#26221a]'}`} />
          <div className={`w-8 h-[2px] transition-all duration-300 ${beat === 3 ? 'bg-[#c9a86a]' : 'bg-[#26221a]'}`} />
        </div>

      </div>
    </div>
  );
};
