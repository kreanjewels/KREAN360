import React, { useState } from 'react';
import { MAKING_STAGES } from '../data/diamondData';
import { Sparkles, ArrowRight, Check, ShieldCheck, Microscope } from 'lucide-react';

export const MakingProcess: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const activeStage = MAKING_STAGES.find((s) => s.id === activeStageId) || MAKING_STAGES[0];

  return (
    <section 
      id="making-process-section"
      className="relative z-20 w-full bg-[#080808] py-24 md:py-32 px-6 md:px-12 border-b border-[#1f1c16]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1f1c16]">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium flex items-center gap-2">
              <Microscope className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>Grown with Purpose</span>
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light mt-3 leading-tight">
              The Genesis of Fire.
            </h2>
            <p className="text-xs sm:text-sm text-[#9e9a8f] mt-4 leading-relaxed font-light">
              From carbon seed to an impeccably faceted master gem. A 5-stage synthesis and lapidary journey engineered for unmatched optical radiance.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-xs font-mono text-[#c9a86a]">0{activeStageId}</span>
            <span className="text-xs text-[#5e594f]">/</span>
            <span className="text-xs font-mono text-[#5e594f]">05</span>
          </div>
        </div>

        {/* Stage Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-12">
          {MAKING_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`text-left p-4 rounded-sm border transition-all duration-300 relative group cursor-pointer ${
                  isActive
                    ? 'border-[#c9a86a] bg-[#12110e]'
                    : 'border-[#201d17] bg-[#0c0c0c] hover:border-[#383327]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono tracking-widest ${isActive ? 'text-[#c9a86a]' : 'text-[#635e53]'}`}>
                    {stage.numberStr}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#c9a86a]" />}
                </div>
                <div className={`text-xs font-medium tracking-wider uppercase transition-colors ${isActive ? 'text-[#f4f2ee]' : 'text-[#8e8a80] group-hover:text-[#dcd7cc]'}`}>
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Display for Active Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0c0c0c] border border-[#201d17] rounded-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Subtle gold decorative accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial-[circle,_rgba(201,168,106,0.04)_0%,_transparent_70%] pointer-events-none" />

          {/* Left: Text & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] bg-[#1c1811] px-3 py-1 border border-[#332a19]">
              <span>Stage {activeStage.numberStr}</span>
              <span className="text-[#6b5832]">•</span>
              <span>{activeStage.subtitle}</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#f4f2ee] font-light leading-snug">
              {activeStage.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#b0aba0] leading-relaxed font-light">
              {activeStage.description}
            </p>

            {/* Technical Specifications Grid */}
            <div className="pt-4 border-t border-[#1f1c16]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8e8a80] block mb-3 font-medium">
                Crystallographic & Engineering Standards:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeStage.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#dcd7cc]">
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#c9a86a]" />
                    <span className="font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Next Stage Trigger */}
            <div className="pt-4 flex items-center gap-4">
              {activeStageId < 5 ? (
                <button
                  onClick={() => setActiveStageId(activeStageId + 1)}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c9a86a] hover:text-[#f4f2ee] transition-colors py-2 font-medium"
                >
                  <span>Next Stage: {MAKING_STAGES[activeStageId].title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="#calibrated-diamonds-section"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c9a86a] hover:text-[#f4f2ee] transition-colors py-2 font-medium"
                >
                  <span>View Finished Loose Diamonds</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Full-Bleed Dark Cinematic Imagery (5 cols) */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative aspect-4/3 sm:aspect-square rounded-sm overflow-hidden border border-[#26221a] group">
              <img
                src={activeStage.imageUrl}
                alt={activeStage.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#c5c1b8]">
                <span>Atelier Archive</span>
                <span className="text-[#c9a86a]">Stage 0{activeStageId}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
