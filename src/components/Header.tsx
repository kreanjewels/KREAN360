import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Gem
} from 'lucide-react';
import { DIAMOND_SHAPES } from '../data/diamondData';
import { DiamondShape } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenTrade: () => void;
  onOpenCert: () => void;
  onSelectShape: (shape: DiamondShape) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenCart,
  onOpenTrade,
  onOpenCert,
  onSelectShape,
  cartCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setProductsMenuOpen(false);
    setCompanyMenuOpen(false);
    setMobileNavOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0a]/92 backdrop-blur-md border-b border-[#26221a] py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <a
            href="#"
            id="brand-logo-link"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif-luxury text-xl md:text-2xl tracking-[0.25em] font-medium text-[#f4f2ee] group-hover:text-[#c9a86a] transition-colors duration-300">
              KREAN JEWELS
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#c9a86a]/90 font-light -mt-0.5">
              Haute Diamantaire
            </span>
          </a>

          {/* Center: Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-9 text-xs tracking-[0.18em] uppercase font-medium text-[#c5c1b8]">
            {/* Company Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setCompanyMenuOpen(true)}
              onMouseLeave={() => setCompanyMenuOpen(false)}
            >
              <button 
                id="nav-company-btn"
                onClick={() => scrollToSection('heritage-section')}
                className="hover:text-[#f4f2ee] flex items-center gap-1 transition-colors py-1 cursor-pointer"
              >
                <span>Company</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8c7343] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {companyMenuOpen && (
                <div 
                  id="company-dropdown-menu"
                  className="absolute top-full left-0 w-64 bg-[#0d0d0d] border border-[#26221a] p-5 shadow-2xl rounded-sm backdrop-blur-xl animate-fadeIn"
                >
                  <div className="space-y-4 text-[11px] tracking-[0.15em] lowercase first-letter:uppercase">
                    <button
                      onClick={() => scrollToSection('heritage-section')}
                      className="block w-full text-left text-[#dcd7cc] hover:text-[#c9a86a] transition-colors"
                    >
                      <div className="font-semibold text-xs tracking-[0.18em] uppercase text-[#f4f2ee]">About Our House</div>
                      <div className="text-[10px] text-[#8e8a80] font-light mt-0.5">Origin, philosophy & modern lapidary values</div>
                    </button>
                    <div className="border-t border-[#1f1c16]" />
                    <button
                      onClick={() => scrollToSection('making-process-section')}
                      className="block w-full text-left text-[#dcd7cc] hover:text-[#c9a86a] transition-colors"
                    >
                      <div className="font-semibold text-xs tracking-[0.18em] uppercase text-[#f4f2ee]">Grown with Purpose</div>
                      <div className="text-[10px] text-[#8e8a80] font-light mt-0.5">The 5-stage crystallization lifecycle</div>
                    </button>
                    <div className="border-t border-[#1f1c16]" />
                    <button
                      onClick={() => scrollToSection('trade-section')}
                      className="block w-full text-left text-[#dcd7cc] hover:text-[#c9a86a] transition-colors"
                    >
                      <div className="font-semibold text-xs tracking-[0.18em] uppercase text-[#f4f2ee]">Antwerp & Mumbai Ateliers</div>
                      <div className="text-[10px] text-[#8e8a80] font-light mt-0.5">Global master cutter presence</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Products Mega-Menu */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setProductsMenuOpen(true)}
              onMouseLeave={() => setProductsMenuOpen(false)}
            >
              <button 
                id="nav-products-btn"
                onClick={() => scrollToSection('calibrated-diamonds-section')}
                className="hover:text-[#f4f2ee] flex items-center gap-1 transition-colors py-1 cursor-pointer"
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8c7343] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {productsMenuOpen && (
                <div 
                  id="products-mega-menu"
                  className="fixed top-[62px] left-1/2 -translate-x-1/2 w-[92vw] max-w-5xl bg-[#0b0b0b]/98 border border-[#2a241b] p-8 shadow-2xl rounded-sm backdrop-blur-2xl animate-fadeIn"
                >
                  <div className="grid grid-cols-12 gap-8 text-left">
                    {/* Col 1: Fine Jewelry (3 cols) */}
                    <div className="col-span-4 border-r border-[#1f1c16] pr-6">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-semibold flex items-center gap-1.5 mb-4">
                        <Sparkles className="w-3 h-3" /> Finished Fine Jewelry
                      </span>
                      <ul className="space-y-3.5 text-xs text-[#dcd7cc]">
                        <li>
                          <button
                            onClick={() => scrollToSection('calibrated-diamonds-section')}
                            className="group/item flex items-center justify-between w-full hover:text-[#c9a86a] transition-colors"
                          >
                            <span>Solitaire & Trilogy Rings</span>
                            <span className="text-[10px] text-[#716d63] group-hover/item:text-[#c9a86a]">0.5–10 ct</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => scrollToSection('calibrated-diamonds-section')}
                            className="group/item flex items-center justify-between w-full hover:text-[#c9a86a] transition-colors"
                          >
                            <span>Tennis & Eternity Bracelets</span>
                            <span className="text-[10px] text-[#716d63] group-hover/item:text-[#c9a86a]">Calibrated</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => scrollToSection('calibrated-diamonds-section')}
                            className="group/item flex items-center justify-between w-full hover:text-[#c9a86a] transition-colors"
                          >
                            <span>Matched Studs & Drop Earrings</span>
                            <span className="text-[10px] text-[#716d63] group-hover/item:text-[#c9a86a]">Pairs</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => scrollToSection('calibrated-diamonds-section')}
                            className="group/item flex items-center justify-between w-full hover:text-[#c9a86a] transition-colors"
                          >
                            <span>Floating Solitaire Pendants</span>
                            <span className="text-[10px] text-[#716d63] group-hover/item:text-[#c9a86a]">18K / Pt</span>
                          </button>
                        </li>
                      </ul>

                      <div className="mt-6 pt-5 border-t border-[#1f1c16]">
                        <button
                          onClick={() => scrollToSection('custom-journey-section')}
                          className="text-[11px] tracking-[0.16em] uppercase text-[#c9a86a] hover:text-[#f4f2ee] flex items-center gap-1.5 transition-colors font-medium"
                        >
                          <span>Bespoke Design Atelier</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Col 2: Loose Diamonds by Shape (5 cols) */}
                    <div className="col-span-5 border-r border-[#1f1c16] pr-6">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-semibold flex items-center gap-1.5 mb-4">
                        <Gem className="w-3 h-3" /> Certified Loose Diamonds
                      </span>
                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-[#dcd7cc]">
                        {DIAMOND_SHAPES.map((shape) => (
                          <button
                            key={shape.name}
                            onClick={() => {
                              onSelectShape(shape.name);
                              scrollToSection('calibrated-diamonds-section');
                            }}
                            className="flex items-center gap-2 text-left hover:text-[#c9a86a] transition-colors py-1 group/shape"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3a352c] group-hover/shape:bg-[#c9a86a] transition-colors" />
                            <span>{shape.name}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#1f1c16] flex items-center justify-between text-[11px] text-[#8e8a80]">
                        <span>Matching Pairs</span>
                        <span>Fancy Color Synthetics</span>
                      </div>
                    </div>

                    {/* Col 3: Highlight Feature (3 cols) */}
                    <div className="col-span-3 flex flex-col justify-between pl-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-[#8c7343] font-semibold mb-2">
                          Spotlight
                        </div>
                        <h4 className="font-serif-luxury text-base text-[#f4f2ee] leading-snug">
                          The 10 ct Masterpiece
                        </h4>
                        <p className="text-[11px] text-[#8e8a80] mt-2 leading-relaxed normal-case">
                          Type IIa purest crystalline perfection, grown over 1,200 continuous hours in our Antwerp reactor.
                        </p>
                      </div>

                      <button
                        onClick={() => scrollToSection('calibrated-diamonds-section')}
                        className="mt-4 px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-[#c9a86a]/40 text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-all duration-300 self-start"
                      >
                        Explore Carat Range
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Certifications Link */}
            <button
              id="nav-certifications-btn"
              onClick={() => {
                onOpenCert();
              }}
              className="hover:text-[#f4f2ee] transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>Certifications</span>
            </button>

            {/* News / Journal Link */}
            <button
              id="nav-news-btn"
              onClick={() => scrollToSection('editorial-section')}
              className="hover:text-[#f4f2ee] transition-colors py-1 cursor-pointer"
            >
              <span>Journal</span>
            </button>

            {/* Connect / Contact Link */}
            <button
              id="nav-connect-btn"
              onClick={() => scrollToSection('connect-section')}
              className="hover:text-[#f4f2ee] transition-colors py-1 cursor-pointer"
            >
              <span>Connect</span>
            </button>
          </nav>

          {/* Right: Utility Icons */}
          <div className="flex items-center space-x-5 md:space-x-6 text-[#c5c1b8]">
            {/* Account / Trade Login */}
            <button
              id="btn-account-login"
              onClick={onOpenTrade}
              aria-label="Trade and Client Portal"
              className="hover:text-[#c9a86a] transition-colors flex items-center gap-1.5 text-xs tracking-wider"
              title="Trade & Client Portal"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-[0.16em] text-[#8e8a80] hover:text-[#c9a86a]">
                Trade
              </span>
            </button>

            {/* Search Icon */}
            <button
              id="btn-search-trigger"
              onClick={onOpenSearch}
              aria-label="Search catalog and shapes"
              className="hover:text-[#c9a86a] transition-colors"
              title="Search Diamond Inventory"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart / Bag Icon */}
            <button
              id="btn-cart-trigger"
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="relative hover:text-[#c9a86a] transition-colors"
              title="View Selections"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#c9a86a] text-[#080808] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden hover:text-[#c9a86a] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileNavOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl pt-24 px-8 pb-12 flex flex-col justify-between overflow-y-auto"
        >
          <div className="space-y-6 text-sm uppercase tracking-[0.2em] font-medium text-[#c5c1b8]">
            <button
              onClick={() => scrollToSection('heritage-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Company & Heritage
            </button>
            <button
              onClick={() => scrollToSection('calibrated-diamonds-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Jewelry & Loose Diamonds
            </button>
            <button
              onClick={() => scrollToSection('making-process-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Grown with Purpose
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenCert();
              }}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Certifications (IGI / HRD)
            </button>
            <button
              onClick={() => scrollToSection('custom-journey-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Custom Design Journey
            </button>
            <button
              onClick={() => scrollToSection('trade-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Trade Sourcing
            </button>
            <button
              onClick={() => scrollToSection('editorial-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Editorial Journal
            </button>
            <button
              onClick={() => scrollToSection('connect-section')}
              className="block w-full text-left py-2 border-b border-[#1f1c16] hover:text-[#c9a86a]"
            >
              Connect & Atelier
            </button>
          </div>

          <div className="pt-8 border-t border-[#1f1c16] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenTrade();
              }}
              className="w-full py-3 border border-[#c9a86a] text-[#c9a86a] text-xs tracking-[0.2em] uppercase font-semibold text-center hover:bg-[#c9a86a] hover:text-[#080808] transition-colors"
            >
              Trade Partner Portal
            </button>
            <div className="text-center text-[10px] text-[#716d63] tracking-widest">
              ANTWERP • MUMBAI • NEW YORK
            </div>
          </div>
        </div>
      )}
    </>
  );
};
