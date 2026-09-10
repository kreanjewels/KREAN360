import React from 'react';
import { ArrowRight, Compass, Gem, Globe, ShieldCheck } from 'lucide-react';

interface HeritageAboutProps {
  onOpenStoryModal: () => void;
}

export const HeritageAbout: React.FC<HeritageAboutProps> = ({ onOpenStoryModal }) => {
  return (
    <section 
      id="heritage-section"
      className="relative z-20 w-full bg-[#080808] py-28 md:py-36 px-6 md:px-12 border-b border-[#1f1c16] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Grand Typographic Stat Treatment (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center border-l-2 border-[#c9a86a]/40 pl-6 sm:pl-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a86a] font-medium block">
            Committed to Excellence.
          </span>

          {/* Grand stat display matching SJWorld */}
          <div className="font-serif-luxury text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f4f2ee] font-light leading-none mt-4 tracking-tight">
            Since 2018.
          </div>

          <div className="text-xs uppercase tracking-[0.3em] text-[#716c61] mt-4 font-mono">
            Antwerp • Mumbai • New York
          </div>
        </div>

        {/* Right: The Brand Story, Audience & Core Ethos (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#f4f2ee] font-light leading-snug">
            Pioneering the Next Era of Conscious Fine Jewelry and Certified Sourcing.
          </h3>

          <p className="text-sm sm:text-base text-[#b0aba0] leading-relaxed font-light">
            Founded to bridge timeless European diamond cutting with sustainable plasma synthesis, KREAN JEWELS caters to both discerning private jewelry patrons and premier international trade houses. By synthesizing diamonds under pristine laboratory parameters, we eliminate terrestrial ecological disturbance while delivering superior Type IIa optical brilliance.
          </p>

          <p className="text-xs sm:text-sm text-[#8e8a80] leading-relaxed font-light">
            Whether fulfilling bespoke private commissions crafted in recycled precious metals or supplying calibrated wholesale parcels to global luxury retailers, our house stands for uncompromised transparency, certified grading, and indelible craftsmanship.
          </p>

          {/* Four Core Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#1f1c16]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c9a86a] font-medium">50,000+ ct</div>
              <div className="text-xs text-[#dcd7cc] mt-1">Sourced & Graded</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c9a86a] font-medium">100% Certified</div>
              <div className="text-xs text-[#dcd7cc] mt-1">IGI & HRD Graded</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c9a86a] font-medium">Global Network</div>
              <div className="text-xs text-[#dcd7cc] mt-1">32 Trade Destinations</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenStoryModal}
              id="btn-our-story"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-[#332e24] hover:border-[#c9a86a] text-[#f4f2ee] hover:text-[#c9a86a] text-xs tracking-[0.2em] uppercase transition-all duration-300 font-medium cursor-pointer"
            >
              <span>Our Story & Atelier Values</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
