import React from 'react';
import { ShieldCheck, ArrowUpRight, CreditCard, Lock, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (topic: string) => void;
  onOpenCert: () => void;
  onOpenTrade: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCert, onOpenTrade }) => {
  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative z-20 w-full bg-[#050505] text-[#8e8a80] pt-20 pb-12 border-t border-[#1a1712]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Tier: Brand Statement & Primary Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1a1712]">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl tracking-[0.25em] font-medium text-[#f4f2ee]">
                KREAN JEWELS
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#c9a86a] -mt-0.5">
                Haute Diamantaire
              </span>
            </div>

            <p className="text-xs text-[#7d786d] leading-relaxed font-light max-w-sm pt-2">
              A certified lab-grown diamond house crafting high-jewelry centerpieces and calibrated wholesale diamonds. Grown with purpose. Certified. Traceable. Timeless.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#c9a86a]">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[11px] tracking-wider uppercase font-medium">
                Direct Lab Sourcing & Global Vault Delivery
              </span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#f4f2ee] font-medium block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('heritage-section')} className="hover:text-[#c9a86a] transition-colors">
                  Company & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calibrated-diamonds-section')} className="hover:text-[#c9a86a] transition-colors">
                  Jewelry & Diamonds
                </button>
              </li>
              <li>
                <button onClick={onOpenCert} className="hover:text-[#c9a86a] transition-colors">
                  Certifications (IGI / HRD)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('custom-journey-section')} className="hover:text-[#c9a86a] transition-colors">
                  Custom Design Journey
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('editorial-section')} className="hover:text-[#c9a86a] transition-colors">
                  Editorial Journal
                </button>
              </li>
              <li>
                <button onClick={onOpenTrade} className="text-[#c9a86a] hover:underline transition-colors font-medium">
                  Trade Partner Access
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#f4f2ee] font-medium block">
              Master Categories
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('calibrated-diamonds-section')} className="hover:text-[#c9a86a] transition-colors">
                  Solitaire & Trilogy Rings (0.5–10 ct)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calibrated-diamonds-section')} className="hover:text-[#c9a86a] transition-colors">
                  Tennis Bracelets & Full Eternity Bands
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calibrated-diamonds-section')} className="hover:text-[#c9a86a] transition-colors">
                  Calibrated Matching Earring Pairs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calibrated-diamonds-section')} className="hover:text-[#c9a86a] transition-colors">
                  Round, Emerald, Oval & Fancy Cuts
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calibrated-diamonds-section')} className="hover:text-[#c9a86a] transition-colors">
                  Type IIa Purest Carbon Stones
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Block (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#f4f2ee] font-medium block">
              Atelier Addresses
            </span>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c9a86a] shrink-0 mt-0.5" />
                <span className="text-[#a8a49a]">
                  <strong>Antwerp:</strong> Hoveniersstraat 53, Diamond District, 2018 Antwerp, Belgium
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c9a86a] shrink-0 mt-0.5" />
                <span className="text-[#a8a49a]">
                  <strong>Mumbai:</strong> Bharat Diamond Bourse, Bandra Kurla Complex, Mumbai 400051
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-[#dcd7cc]">
                <Mail className="w-3.5 h-3.5 text-[#c9a86a]" />
                <a href="mailto:concierge@kreanjewels.com" className="hover:text-[#c9a86a] transition-colors">
                  concierge@kreanjewels.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#dcd7cc]">
                <Phone className="w-3.5 h-3.5 text-[#c9a86a]" />
                <span>+1 (800) 845-KREAN</span>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Tier: Payment Badges & Trust Security */}
        <div className="py-8 border-b border-[#1a1712] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#716c61]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#c9a86a]" />
            <span className="uppercase tracking-wider text-[10px]">Secure Settlement Channels:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-[#0c0c0c] border border-[#201d17] text-[10px] text-[#c5c1b8] font-mono">
              Bank Wire Transfer (SWIFT)
            </span>
            <span className="px-2.5 py-1 bg-[#0c0c0c] border border-[#201d17] text-[10px] text-[#c5c1b8] font-mono">
              Visa Infinite
            </span>
            <span className="px-2.5 py-1 bg-[#0c0c0c] border border-[#201d17] text-[10px] text-[#c5c1b8] font-mono">
              Mastercard World Elite
            </span>
            <span className="px-2.5 py-1 bg-[#0c0c0c] border border-[#201d17] text-[10px] text-[#c5c1b8] font-mono">
              American Express
            </span>
            <span className="px-2.5 py-1 bg-[#0c0c0c] border border-[#201d17] text-[10px] text-[#c5c1b8] font-mono">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 bg-[#0c0c0c] border border-[#201d17] text-[10px] text-[#c9a86a] font-mono">
              Escrow Diamond Memo
            </span>
          </div>
        </div>

        {/* Bottom Tier: Legal Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#5e594f]">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button onClick={() => onOpenLegal('Privacy Policy')} className="hover:text-[#c9a86a] transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('Terms of Service')} className="hover:text-[#c9a86a] transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('Shipping & Insurance Policy')} className="hover:text-[#c9a86a] transition-colors">
              Shipping & Insurance
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('Refund & Exchange Policy')} className="hover:text-[#c9a86a] transition-colors">
              Refund & Exchange
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('Legal Notice & Conflict Free Declaration')} className="hover:text-[#c9a86a] transition-colors">
              Legal Notice
            </button>
            <span>•</span>
            <button onClick={() => onOpenLegal('Contact Information')} className="hover:text-[#c9a86a] transition-colors">
              Contact Information
            </button>
          </div>

          <div className="tracking-wider">
            © 2026 KREAN JEWELS. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
