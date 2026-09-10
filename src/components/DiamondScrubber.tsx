import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Sparkles, Compass, ShieldCheck } from 'lucide-react';

const TOTAL_FRAMES = 100;

export const DiamondScrubber: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  
  const [loadedCount, setLoadedCount] = useState(0);
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

  // Sync state refs for animation loop
  isAutoSpinningRef.current = isAutoSpinning;
  isDraggingRef.current = isDragging;

  // 1. Preload 100 WebP frames with immediate availability cache
  useEffect(() => {
    let isMounted = true;
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/diamond-sequence/frame_${frameNum}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i] = img;
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-performance canvas drawing helper
  const drawFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Wrap around 0..99
    let safeIdx = Math.round(frameIdx) % TOTAL_FRAMES;
    if (safeIdx < 0) safeIdx += TOTAL_FRAMES;

    // Find nearest loaded image if current isn't ready
    let img = imagesRef.current[safeIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback search to closest loaded frame
      for (let offset = 1; offset < 10; offset++) {
        const prev = (safeIdx - offset + TOTAL_FRAMES) % TOTAL_FRAMES;
        const next = (safeIdx + offset) % TOTAL_FRAMES;
        if (imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth) {
          img = imagesRef.current[prev];
          break;
        }
        if (imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth) {
          img = imagesRef.current[next];
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
          
          {/* Preload status if still caching */}
          {loadedCount < TOTAL_FRAMES && (
            <div className="absolute top-0 text-[10px] tracking-[0.2em] text-[#c9a86a]/70 uppercase animate-pulse">
              Caching High-Def Facets: {loadedCount}%
            </div>
          )}

          {/* Canvas Wrapper with tactile touch-action none */}
          <div
            className="relative cursor-grab active:cursor-grabbing group touch-none select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Glowing ring behind diamond */}
            <div className="absolute inset-0 rounded-full bg-radial-[circle,_rgba(201,168,106,0.08)_0%,_transparent_70%] scale-110 pointer-events-none" />

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
