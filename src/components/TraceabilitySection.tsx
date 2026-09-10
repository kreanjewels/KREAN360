import React from 'react';
import { ShieldCheck, ArrowRight, FileCheck, CheckCircle2 } from 'lucide-react';

interface TraceabilitySectionProps {
  onOpenCertGuide: () => void;
}

export const TraceabilitySection: React.FC<TraceabilitySectionProps> = ({ onOpenCertGuide }) => {
  return (
    <section 
      id="traceability-section"
      className="relative z-20 w-full min-h-[500px] flex items-center justify-center bg-[#070707] py-28 px-6 md:px-12 border-b border-[#1f1c16] overflow-hidden"
    >
      {/* Subtle atmospheric backdrop */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_rgba(201,168,106,0.05)_0%,_transparent_60%] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a86a]/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-8">
        
        {/* Subtle emblem */}
        <div className="w-12 h-12 rounded-full border border-[#332e24] flex items-center justify-center text-[#c9a86a] bg-black/60 backdrop-blur-md">
          <ShieldCheck className="w-6 h-6" />
        </div>

        {/* Quiet headline pairing two words */}
        <div className="space-y-2">
          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#f4f2ee] leading-none">
            Certified. Consistent.
          </h2>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#8c7343] font-light">
            Uncompromising Lab Standards
          </div>
        </div>

        {/* Single supporting sentence */}
        <p className="font-serif-luxury italic text-base sm:text-xl md:text-2xl text-[#c5c1b8] max-w-2xl font-normal leading-relaxed">
          "Every KREAN JEWELS diamond is graded by IGI or HRD and documented from certification through to final setting."
        </p>

        {/* Key Verification Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#8e8a80] pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Microscopic Laser Inscription</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Digital QR Ledger Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>100% Conflict-Free Origin</span>
          </div>
        </div>

        {/* CTA linking to certification & grading guide */}
        <div className="pt-4">
          <button
            onClick={onOpenCertGuide}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-[#c9a86a] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>Access Certification & Grading Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
