import React from 'react';
import { ShieldCheck, Award, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';

interface TrustBarProps {
  onOpenCertModal: () => void;
}

export const TrustBar: React.FC<TrustBarProps> = ({ onOpenCertModal }) => {
  return (
    <section 
      id="trust-bar-section"
      className="relative z-20 w-full bg-[#0a0a0a] border-y border-[#1f1c16] py-10 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Section descriptor */}
        <div className="text-center lg:text-left">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-medium flex items-center justify-center lg:justify-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Independent Verification</span>
          </div>
          <p className="font-serif-luxury text-xl md:text-2xl text-[#f4f2ee] mt-1 font-light">
            Graded by the World’s Leading Gemological Laboratories
          </p>
        </div>

        {/* Right: Certification & Trust Logos in Crisp Outline Treatment */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          
          {/* IGI Badge */}
          <button
            onClick={onOpenCertModal}
            className="group flex flex-col items-center p-3.5 rounded-sm border border-[#26221a] hover:border-[#c9a86a]/60 bg-black/40 backdrop-blur-sm transition-all duration-300 min-w-[130px] cursor-pointer"
          >
            <div className="font-serif-luxury text-2xl font-bold tracking-widest text-[#f4f2ee] group-hover:text-[#c9a86a] transition-colors">
              IGI
            </div>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8e8a80] mt-0.5">
              International Gemological Inst.
            </span>
            <span className="text-[8px] tracking-[0.2em] text-[#c9a86a]/80 mt-1 flex items-center gap-0.5">
              Verify Report <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </button>

          {/* HRD Antwerp Badge */}
          <button
            onClick={onOpenCertModal}
            className="group flex flex-col items-center p-3.5 rounded-sm border border-[#26221a] hover:border-[#c9a86a]/60 bg-black/40 backdrop-blur-sm transition-all duration-300 min-w-[130px] cursor-pointer"
          >
            <div className="font-serif-luxury text-2xl font-bold tracking-widest text-[#f4f2ee] group-hover:text-[#c9a86a] transition-colors">
              HRD
            </div>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8e8a80] mt-0.5">
              HRD Antwerp European Lab
            </span>
            <span className="text-[8px] tracking-[0.2em] text-[#c9a86a]/80 mt-1 flex items-center gap-0.5">
              Master Dossier <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </button>

          {/* Type IIa Purity Mark */}
          <div className="flex flex-col items-center p-3.5 rounded-sm border border-[#26221a] bg-black/30 min-w-[130px]">
            <div className="flex items-center gap-1 text-[#c9a86a]">
              <Award className="w-5 h-5" />
              <span className="font-mono text-sm font-semibold tracking-wider">TYPE IIa</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8e8a80] mt-0.5">
              Purest Carbon Matrix
            </span>
            <span className="text-[8px] text-[#5e594f] mt-1">Zero Nitrogen Strain</span>
          </div>

          {/* SCS-007 Sustainability Standard */}
          <div className="flex flex-col items-center p-3.5 rounded-sm border border-[#26221a] bg-black/30 min-w-[130px]">
            <div className="flex items-center gap-1 text-[#f4f2ee]">
              <CheckCircle2 className="w-4 h-4 text-[#c9a86a]" />
              <span className="font-sans-luxury text-xs font-semibold tracking-wider">SCS-007</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#8e8a80] mt-0.5">
              Climate Neutral Standard
            </span>
            <span className="text-[8px] text-[#5e594f] mt-1">100% Conflict-Free</span>
          </div>

        </div>
      </div>
    </section>
  );
};
