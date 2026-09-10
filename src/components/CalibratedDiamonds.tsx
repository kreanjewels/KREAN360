import React, { useState, useMemo } from 'react';
import { CARAT_PRESETS, DIAMOND_SHAPES, PRODUCTS_CATALOG } from '../data/diamondData';
import { DiamondShape, JewelryProduct } from '../types';
import { 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Gem,
  Info,
  Search
} from 'lucide-react';

interface CalibratedDiamondsProps {
  selectedShape: DiamondShape;
  onSelectShape: (shape: DiamondShape) => void;
  onAddToCart: (product: JewelryProduct) => void;
  onViewCert: (certNum: string) => void;
  onRequestCustom: (productName?: string) => void;
}

export const CalibratedDiamonds: React.FC<CalibratedDiamondsProps> = ({
  selectedShape,
  onSelectShape,
  onAddToCart,
  onViewCert,
  onRequestCustom,
}) => {
  const [caratSliderValue, setCaratSliderValue] = useState<number>(2.0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'rings' | 'bracelets' | 'earrings' | 'pendants' | 'loose'>('all');
  const [activeShapeFilter, setActiveShapeFilter] = useState<DiamondShape | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'carat-desc'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(16);

  // Find closest carat preset for specification indicators
  const currentCaratSpec = CARAT_PRESETS.reduce((prev, curr) => 
    Math.abs(curr.carat - caratSliderValue) < Math.abs(prev.carat - caratSliderValue) ? curr : prev
  );

  // Counts per category
  const categoryCounts = useMemo(() => {
    return {
      all: PRODUCTS_CATALOG.length,
      rings: PRODUCTS_CATALOG.filter(p => p.category === 'rings').length,
      bracelets: PRODUCTS_CATALOG.filter(p => p.category === 'bracelets').length,
      earrings: PRODUCTS_CATALOG.filter(p => p.category === 'earrings').length,
      pendants: PRODUCTS_CATALOG.filter(p => p.category === 'pendants').length,
      loose: PRODUCTS_CATALOG.filter(p => p.category === 'loose').length,
    };
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS_CATALOG.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesShape = activeShapeFilter === 'all' || item.shape.toLowerCase() === activeShapeFilter.toLowerCase();
      const matchesSearch = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shape.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesShape && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceUsd - b.priceUsd);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceUsd - a.priceUsd);
    } else if (sortBy === 'carat-desc') {
      result.sort((a, b) => b.caratWeight - a.caratWeight);
    }

    return result;
  }, [activeCategory, activeShapeFilter, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section 
      id="calibrated-diamonds-section"
      className="relative z-20 w-full bg-[#090909] py-24 md:py-32 px-6 md:px-12 border-b border-[#1f1c16]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium flex items-center justify-center gap-2">
            <Gem className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>KREAN JEWELS Official Collection</span>
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light mt-3">
            Your Vision, Our Diamonds.
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9a8f] mt-4 font-light leading-relaxed">
            Certified CVD lab-grown diamonds, high jewelry creations, and calibrated wholesale layouts directly from our atelier.
          </p>
        </div>

        {/* 1. Interactive Carat Range Slider & Dimensional Matrix */}
        <div className="bg-[#0e0e0e] border border-[#231f18] p-6 sm:p-10 rounded-sm mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#1f1c16]">
            
            {/* Slider Control */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c9a86a] font-medium flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#c9a86a]" />
                  <span>Optical Carat Calibrator</span>
                </span>
                <span className="text-sm font-mono text-[#f4f2ee]">
                  {caratSliderValue.toFixed(2)} CT
                </span>
              </div>

              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.25"
                value={caratSliderValue}
                onChange={(e) => setCaratSliderValue(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#1f1c16] rounded-lg appearance-none cursor-pointer accent-[#c9a86a]"
              />

              <div className="flex justify-between text-[10px] text-[#716c61] font-mono mt-2">
                <span>0.50 ct</span>
                <span>2.00 ct</span>
                <span>5.00 ct</span>
                <span>7.50 ct</span>
                <span>10.00 ct</span>
              </div>
            </div>

            {/* Dimensional Readout */}
            <div className="flex flex-wrap items-center gap-6 lg:border-l lg:border-[#1f1c16] lg:pl-8">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Table Ratio</span>
                <span className="font-mono text-sm text-[#f4f2ee]">{currentCaratSpec.tablePct}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Depth Ratio</span>
                <span className="font-mono text-sm text-[#f4f2ee]">{currentCaratSpec.depthPct}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Est. Spread</span>
                <span className="font-mono text-sm text-[#f4f2ee]">{currentCaratSpec.diameterMm}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Color / Clarity</span>
                <span className="font-mono text-sm text-[#c9a86a]">{currentCaratSpec.avgColor} / {currentCaratSpec.avgClarity}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8e8a80]">
            <span className="font-light">
              <strong className="text-[#f4f2ee]">Optimal Setting Application:</strong> {currentCaratSpec.idealApplication}
            </span>
            <span className="font-mono text-[10px] text-[#716c61]">
              Sample Dossier: {currentCaratSpec.igiReportExample}
            </span>
          </div>
        </div>

        {/* 2. Shape Selector Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8e8a80]">
              Filter by Silhouette:
            </span>
            {activeShapeFilter !== 'all' && (
              <button
                onClick={() => setActiveShapeFilter('all')}
                className="text-[11px] text-[#c9a86a] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Reset Shape Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {DIAMOND_SHAPES.map((shape) => {
              const isSelected = activeShapeFilter === shape.name;
              return (
                <button
                  key={shape.name}
                  onClick={() => {
                    if (activeShapeFilter === shape.name) {
                      setActiveShapeFilter('all');
                    } else {
                      setActiveShapeFilter(shape.name);
                      onSelectShape(shape.name);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#c9a86a] bg-[#1a1712] text-[#f4f2ee] shadow-lg shadow-[#c9a86a]/10'
                      : 'border-[#1f1c16] bg-[#0c0c0c] text-[#787367] hover:border-[#332b1e] hover:text-[#c5c1b8]'
                  }`}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-6 h-6 mb-1.5 transition-colors ${
                      isSelected ? 'text-[#c9a86a]' : 'text-[#787367]'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path d={shape.svgPath} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] tracking-wider uppercase font-medium">
                    {shape.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Category Tabs & Search / Sort Controls */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: `All Creations (${categoryCounts.all})` },
              { id: 'rings', label: `Rings & Solitaires (${categoryCounts.rings})` },
              { id: 'bracelets', label: `Tennis Bracelets (${categoryCounts.bracelets})` },
              { id: 'earrings', label: `Earrings & Studs (${categoryCounts.earrings})` },
              { id: 'pendants', label: `Pendants & Necklaces (${categoryCounts.pendants})` },
              { id: 'loose', label: `Loose Diamonds (${categoryCounts.loose})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setVisibleCount(16);
                }}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-sm cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#18150f] border border-[#c9a86a] text-[#f4f2ee] font-medium'
                    : 'border border-[#1f1c16] text-[#7e796e] hover:text-[#c5c1b8] hover:border-[#2e2920]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1a1712]">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#7e796e] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(16);
                }}
                placeholder="Search by cut, metal, pink, carat..."
                className="w-full bg-[#0d0d0d] border border-[#1f1c16] focus:border-[#c9a86a] rounded-sm pl-9 pr-3 py-1.5 text-xs text-[#f4f2ee] placeholder-[#5a564e] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#7e796e] hover:text-[#f4f2ee]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Count & Sort */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-xs text-[#8e8a80]">
              <span>
                Showing <strong className="text-[#f4f2ee]">{displayedProducts.length}</strong> of {filteredProducts.length} pieces
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#635e53]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort creations"
                  className="bg-[#0d0d0d] border border-[#1f1c16] rounded-sm px-2.5 py-1 text-xs text-[#c5c1b8] focus:border-[#c9a86a] outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="carat-desc">Carat: Largest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Products Showcase Grid */}
        {displayedProducts.length === 0 ? (
          <div className="p-16 text-center border border-[#1f1c16] rounded-sm bg-[#0a0a0a]">
            <p className="text-sm text-[#8e8a80]">No creations match your current filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveShapeFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 text-xs uppercase tracking-wider text-[#c9a86a] border border-[#332b1e] hover:border-[#c9a86a] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#0b0b0b] border border-[#1f1c16] hover:border-[#c9a86a]/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(201,168,106,0.18)]"
              >
                <div>
                  {/* Product Image on Dark Backdrop with Subtle Zoom & Gold-Tinted Overlay */}
                  <div className="relative aspect-square overflow-hidden bg-[#070707] flex items-center justify-center p-3.5">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain grayscale-[8%] group-hover:grayscale-0 transform transition-transform duration-700 ease-out group-hover:scale-108 brightness-95 group-hover:brightness-105"
                    />
                    
                    {/* Dark gradient for bottom text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Subtle gold-tinted overlay & ambient facet illumination on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#c9a86a]/20 via-[#c9a86a]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-[circle_at_center,_rgba(201,168,106,0.12)_0%,_transparent_70%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Badge */}
                    {product.tag && (
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 bg-black/70 backdrop-blur-md border border-[#2a2620] group-hover:border-[#c9a86a]/40 text-[#c9a86a] transition-colors">
                        {product.tag}
                      </span>
                    )}

                    {/* Cert pill */}
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 bg-[#12110e] border border-[#332a19] group-hover:border-[#c9a86a]/40 text-[#e6ca85] transition-colors">
                      {product.certBody} Certified
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#c5c1b8]">
                      <span>{product.shape} • {product.caratWeight.toFixed(2)} ct</span>
                      <span className="font-mono text-[#c9a86a]">{product.colorGrade} / {product.clarityGrade}</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#787367] mb-1">
                      {product.metal}
                    </div>
                    <h4 className="font-serif-luxury text-lg text-[#f4f2ee] font-medium leading-snug group-hover:text-[#c9a86a] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#8e8a80] mt-2 line-clamp-2 leading-relaxed font-light">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-5 pt-0 border-t border-[#1a1712] mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Direct Value</span>
                    <span className="font-mono text-base font-medium text-[#f4f2ee]">
                      ${product.priceUsd.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewCert(product.certNumber)}
                      className="p-2 text-[#8e8a80] hover:text-[#c9a86a] border border-[#201d17] hover:border-[#c9a86a]/40 transition-colors cursor-pointer"
                      title="Inspect Laboratory Dossier"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] bg-[#161410] hover:bg-[#c9a86a] text-[#c9a86a] hover:text-[#080808] border border-[#383020] hover:border-[#c9a86a] transition-all duration-300 font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Select</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 16)}
              className="px-8 py-3 bg-[#11100d] border border-[#3a3325] hover:border-[#c9a86a] text-xs uppercase tracking-[0.2em] text-[#e6ca85] transition-all hover:bg-[#c9a86a] hover:text-[#080808] cursor-pointer font-medium"
            >
              Load More Creations ({filteredProducts.length - visibleCount} Remaining)
            </button>
          </div>
        )}

        {/* Custom inquiry prompt banner */}
        <div className="mt-16 p-8 border border-[#26221a] bg-gradient-to-r from-[#0d0d0d] via-[#12100b] to-[#0d0d0d] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a86a] font-medium">Bespoke Diamond Sourcing</span>
            <h3 className="font-serif-luxury text-2xl text-[#f4f2ee] font-light mt-1">
              Require a Specific Diamond Ratio or Fancy Color?
            </h3>
            <p className="text-xs text-[#8e8a80] mt-1 font-light">
              We calibrate custom matched pairs, calibrated tennis layouts, and unique cuts up to 15 carats.
            </p>
          </div>

          <button
            onClick={() => onRequestCustom()}
            className="px-6 py-3 border border-[#c9a86a] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] text-xs tracking-[0.2em] uppercase font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            Request Custom Diamond
          </button>
        </div>

      </div>
    </section>
  );
};
