import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroVideoProps {
  onExploreClick: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onExploreClick }) => {
  const [heroScrollPct, setHeroScrollPct] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const pct = Math.min(100, Math.max(0, Math.round((scrollY / heroHeight) * 100)));
      setHeroScrollPct(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero-section"
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Background Looping Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain md:object-cover scale-105 opacity-80 transition-opacity duration-1000"
      >
        <source src="/hero-diamond.mp4" type="video/mp4" />
      </video>

      {/* Cinematic dark gradients for legibility & seamless fade to dark theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[ellipse_at_center,_transparent_30%,_#080808_95%] pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Side Scroll Progress Indicator (Thin line & percentage) */}
      <div 
        id="hero-progress-indicator"
        className="hidden md:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-20 text-[10px] tracking-[0.25em] text-[#8e8a80]"
      >
        <span className="font-mono text-[#c9a86a]">{String(heroScrollPct).padStart(2, '0')}%</span>
        <div className="w-[1px] h-28 bg-[#26221a] relative overflow-hidden">
          <div 
            className="w-full bg-[#c9a86a] transition-all duration-150 absolute top-0 left-0"
            style={{ height: `${heroScrollPct}%` }}
          />
        </div>
        <span className="[writing-mode:vertical-lr] text-[9px] uppercase tracking-[0.3em] text-[#6b665c]">
          Progress
        </span>
      </div>

      {/* Overlaid Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6 md:space-y-8">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9a86a]/30 bg-black/40 backdrop-blur-md text-[#c9a86a] text-[10px] tracking-[0.3em] uppercase">
          <Sparkles className="w-3 h-3 text-[#c9a86a]" />
          <span>Haute Lab-Grown Diamonds</span>
        </div>

        {/* Brand Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f4f2ee] font-light leading-[1.08] max-w-4xl">
          Grown in light, cut with precision.
        </h1>

        {/* Poetic Subline */}
        <p className="font-serif-luxury italic text-lg sm:text-2xl md:text-3xl text-[#d4cfc3] max-w-2xl font-normal leading-relaxed opacity-95">
          "Certified from crystal to facet, expressed in fire."
        </p>

        {/* Factual line breaks as visual punctuation */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 pt-2 text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#a8a49a] font-light">
          <span>Grown with Purpose</span>
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c9a86a]" />
          <span>Certified</span>
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c9a86a]" />
          <span>Traceable</span>
          <span className="w-1.5 h-1.5 rotate-45 border border-[#c9a86a]" />
          <span>Timeless</span>
        </div>

        {/* Primary CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onExploreClick}
            id="hero-explore-btn"
            className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.22em] uppercase border border-[#c9a86a] bg-[#c9a86a]/10 hover:bg-[#c9a86a] text-[#f4f2ee] hover:text-[#080808] transition-all duration-300 font-medium cursor-pointer"
          >
            Explore Master Collection
          </button>
          <a
            href="#diamond-turntable-section"
            className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.22em] uppercase border border-[#332e24] hover:border-[#c9a86a]/60 text-[#c5c1b8] hover:text-[#f4f2ee] bg-black/40 backdrop-blur-md transition-all duration-300 font-normal"
          >
            Orbit 360° Stone
          </a>
        </div>
      </div>

      {/* Faint scroll cue at bottom */}
      <a 
        href="#diamond-turntable-section"
        id="hero-scroll-cue"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#736e63] hover:text-[#c9a86a] transition-colors cursor-pointer group"
        aria-label="Scroll to interactive diamond rotation"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] font-light">Scroll to Orbit</span>
        <div className="w-5 h-8 rounded-full border border-[#332e24] group-hover:border-[#c9a86a] flex justify-center p-1 transition-colors">
          <div className="w-1 h-1.5 bg-[#c9a86a] rounded-full animate-bounce mt-1" />
        </div>
      </a>
    </section>
  );
};
