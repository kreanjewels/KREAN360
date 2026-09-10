import React, { useState } from 'react';
import { CUSTOM_JOURNEY_STEPS } from '../data/diamondData';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Layers, Gem } from 'lucide-react';

interface CustomDesignJourneyProps {
  onRequestCustomDiamond: () => void;
  onRequestCustomJewelry: () => void;
}

export const CustomDesignJourney: React.FC<CustomDesignJourneyProps> = ({
  onRequestCustomDiamond,
  onRequestCustomJewelry,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = CUSTOM_JOURNEY_STEPS[activeStepIndex];

  return (
    <section 
      id="custom-journey-section"
      className="relative z-20 w-full bg-[#0a0a0a] py-28 md:py-36 px-6 md:px-12 border-b border-[#1f1c16]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Bespoke Commissioning</span>
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light mt-3">
            The Custom Design Journey.
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9a8f] mt-4 font-light leading-relaxed">
            From initial gemological sketch to an insured delivery in our signature velvet casket. A seamless six-step atelier engagement.
          </p>
        </div>

        {/* 6-Step Stepper Header */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-12">
          {CUSTOM_JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-sm border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#c9a86a] bg-[#14120e] shadow-lg'
                    : 'border-[#1f1c16] bg-[#0c0c0c] hover:border-[#332e24]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono ${isActive ? 'text-[#c9a86a]' : 'text-[#615c51]'}`}>
                    0{step.stepNumber}
                  </span>
                  <span className="text-[9px] text-[#716c61]">{step.timeline}</span>
                </div>
                <div className={`text-[11px] font-medium tracking-wider uppercase line-clamp-2 ${isActive ? 'text-[#f4f2ee]' : 'text-[#8e8a80]'}`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-[#0e0e0e] border border-[#26221a] rounded-sm p-6 sm:p-10 lg:p-14 relative overflow-hidden mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Step Description & Milestones (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c9a86a]">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Turnaround: {activeStep.timeline}</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#f4f2ee] font-light leading-snug">
                Step 0{activeStep.stepNumber}: {activeStep.title}
              </h3>

              <div className="text-xs uppercase tracking-wider text-[#c9a86a]/90 font-medium">
                {activeStep.highlight}
              </div>

              <p className="text-xs sm:text-sm text-[#b0aba0] leading-relaxed font-light">
                {activeStep.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-[#1f1c16]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8e8a80] block mb-3 font-medium">
                  Client Deliverables & Bench Verification:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeStep.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#dcd7cc] bg-black/40 p-2.5 border border-[#201d17]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a86a] shrink-0" />
                      <span className="text-[11px] font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stepper Navigation */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(activeStepIndex - 1)}
                  className="px-4 py-2 border border-[#26221a] disabled:opacity-30 text-xs uppercase tracking-wider text-[#8e8a80] hover:text-[#f4f2ee] hover:border-[#383327] transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={activeStepIndex === CUSTOM_JOURNEY_STEPS.length - 1}
                  onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                  className="px-4 py-2 border border-[#383327] disabled:opacity-30 text-xs uppercase tracking-wider text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-all font-medium"
                >
                  Next Phase (0{activeStepIndex + 2})
                </button>
              </div>

            </div>

            {/* Right: Atelier Visual Artifact (5 cols) */}
            <div className="lg:col-span-5 bg-[#090909] border border-[#201d17] p-8 rounded-sm text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-[#332e24] flex items-center justify-center text-[#c9a86a]">
                <Gem className="w-8 h-8" />
              </div>

              <div className="font-serif-luxury text-xl text-[#f4f2ee]">
                Dedicated Master Diamantaire
              </div>

              <p className="text-xs text-[#8e8a80] font-light max-w-xs leading-relaxed">
                Direct one-on-one communication via private encrypted messaging or video atelier sessions throughout your commission.
              </p>

              <div className="w-full pt-4 border-t border-[#1f1c16] flex justify-around text-[10px] uppercase tracking-wider text-[#a8a49a]">
                <span>Lossless CAD</span>
                <span>•</span>
                <span>Insured Transit</span>
                <span>•</span>
                <span>Lifetime Polish</span>
              </div>
            </div>

          </div>

        </div>

        {/* Two CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onRequestCustomDiamond}
            id="btn-request-custom-diamond"
            className="w-full sm:w-auto px-8 py-4 border border-[#c9a86a] bg-[#c9a86a] text-[#080808] hover:bg-[#e6ca85] text-xs tracking-[0.22em] uppercase font-semibold transition-colors cursor-pointer"
          >
            Request Custom Diamond
          </button>

          <button
            onClick={onRequestCustomJewelry}
            id="btn-request-custom-jewelry"
            className="w-full sm:w-auto px-8 py-4 border border-[#383327] hover:border-[#c9a86a] bg-[#12110e] text-[#f4f2ee] hover:text-[#c9a86a] text-xs tracking-[0.22em] uppercase font-semibold transition-colors cursor-pointer"
          >
            Request Custom Jewelry
          </button>
        </div>

      </div>
    </section>
  );
};
