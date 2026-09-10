import React from 'react';
import { Globe, Building2, PackageCheck, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface TradeSourcingProps {
  onOpenTradeModal: () => void;
}

export const TradeSourcing: React.FC<TradeSourcingProps> = ({ onOpenTradeModal }) => {
  return (
    <section 
      id="trade-section"
      className="relative z-20 w-full bg-[#080808] py-28 md:py-36 px-6 md:px-12 border-b border-[#1f1c16]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Heading & Capabilities (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>B2B & Manufacturer Division</span>
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light leading-tight">
              Sourcing for the Trade.
            </h2>

            <p className="text-sm sm:text-base text-[#b0aba0] leading-relaxed font-light">
              KREAN JEWELS serves as a primary source supplier to premier retail jewelers, independent high-jewelry maisons, and global trade sourcing partners. We provide direct-access pricing on certified loose lab-grown diamonds from 0.05 ct to 10+ carats across all fancy cuts, matching layouts, and calibrated melee parcels.
            </p>

            <p className="text-xs sm:text-sm text-[#8e8a80] leading-relaxed font-light">
              Beyond loose supply, our full-stack private-label manufacturing encompasses precision CAD modeling, lost-wax casting in 9K, 14K, and 18K gold (White, Yellow, Rose), 925 sterling silver, and 950 platinum, backed by worldwide insured vault delivery and memo programs.
            </p>

            {/* Trade Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1f1c16]">
              <div className="p-3.5 bg-[#0d0d0d] border border-[#1f1c16]">
                <div className="text-[10px] uppercase tracking-wider text-[#c9a86a] font-medium">Wholesale Pricing</div>
                <div className="text-xs text-[#8e8a80] mt-1">Tiered volume discounts</div>
              </div>
              <div className="p-3.5 bg-[#0d0d0d] border border-[#1f1c16]">
                <div className="text-[10px] uppercase tracking-wider text-[#c9a86a] font-medium">Precious Metals</div>
                <div className="text-xs text-[#8e8a80] mt-1">9K / 14K / 18K / Pt950</div>
              </div>
              <div className="p-3.5 bg-[#0d0d0d] border border-[#1f1c16]">
                <div className="text-[10px] uppercase tracking-wider text-[#c9a86a] font-medium">Bespoke CAD</div>
                <div className="text-xs text-[#8e8a80] mt-1">Private-label casting</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenTradeModal}
                id="btn-partner-with-us"
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#c9a86a] bg-[#c9a86a] text-[#080808] hover:bg-[#e6ca85] text-xs tracking-[0.22em] uppercase font-semibold transition-colors cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Trade Key Figures Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#0d0d0d] border border-[#231f18] p-8 sm:p-10 rounded-sm space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#f4f2ee] font-light pb-4 border-b border-[#1f1c16]">
              Trade Partner Advantage
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <PackageCheck className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#f4f2ee] font-medium">Live Inventory Feed & API</div>
                  <p className="text-[#8e8a80] text-[11px] mt-0.5 leading-relaxed font-light">
                    Real-time stock feeds compatible with Shopify, RapNet, and custom ERP integration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#f4f2ee] font-medium">Dual IGI & HRD Laboratory Verification</div>
                  <p className="text-[#8e8a80] text-[11px] mt-0.5 leading-relaxed font-light">
                    Every loose diamond ships sealed with tamper-evident digital certificates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#f4f2ee] font-medium">Malca-Amit & Brink's Insured Logistics</div>
                  <p className="text-[#8e8a80] text-[11px] mt-0.5 leading-relaxed font-light">
                    Expedited door-to-door vault delivery to 30+ countries with full transit insurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f1c16] text-[10px] text-[#716c61] uppercase tracking-widest text-center">
              Exclusive to Registered Trade & Retail Entities
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
