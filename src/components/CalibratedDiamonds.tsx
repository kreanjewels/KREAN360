import React, { useState } from 'react';
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
  Info
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'solitaires' | 'side-stones' | 'tennis-eternity' | 'curated-layouts'>('all');

  // Find closest carat preset for specification indicators
  const currentCaratSpec = CARAT_PRESETS.reduce((prev, curr) => 
    Math.abs(curr.carat - caratSliderValue) < Math.abs(prev.carat - caratSliderValue) ? curr : prev
  );

  // Filter products
  const filteredProducts = PRODUCTS_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.subCategory === activeCategory;
    return matchesCategory;
  });

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
            <span>Calibrated Selections</span>
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light mt-3">
            Your Vision, Our Diamonds.
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9a8f] mt-4 font-light leading-relaxed">
            Certified, calibrated, and consistent — every shape, every carat range from 0.05 ct to 10.00 ct.
          </p>
        </div>

        {/* 1. Interactive Carat Range Slider & Dimensional Matrix */}
        <div className="bg-[#0e0e0e] border border-[#231f18] p-6 sm:p-10 rounded-sm mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#1f1c16]">
            
            {/* Slider Control */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c9a86a] font-medium flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Calibrated Carat Range
                </span>
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-medium">
                  {caratSliderValue.toFixed(2)} <span className="text-sm font-sans font-light text-[#8e8a80]">Carat</span>
                </span>
              </div>

              {/* Range Input with custom champagne accent */}
              <input
                type="range"
                min="0.50"
                max="10.00"
                step="0.25"
                value={caratSliderValue}
                onChange={(e) => setCaratSliderValue(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#201d17] rounded-lg appearance-none cursor-pointer accent-[#c9a86a]"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#635e53] mt-2">
                <span>0.50 ct (Melee & Studs)</span>
                <span>2.00 ct (Solitaire Standard)</span>
                <span>5.00 ct (Haute Joaillerie)</span>
                <span>10.00 ct (Collector Apex)</span>
              </div>
            </div>

            {/* Visual Diameter Representation circle */}
            <div className="flex items-center justify-center lg:justify-end gap-6 min-w-[280px]">
              <div className="flex flex-col items-center">
                <div 
                  className="rounded-full border border-[#c9a86a] flex items-center justify-center bg-radial-[circle,_rgba(201,168,106,0.15)_0%,_transparent_70%] transition-all duration-300 shadow-[0_0_20px_rgba(201,168,106,0.2)]"
                  style={{
                    width: `${Math.max(36, Math.min(100, 30 + caratSliderValue * 6.5))}px`,
                    height: `${Math.max(36, Math.min(100, 30 + caratSliderValue * 6.5))}px`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#c9a86a]" />
                </div>
                <span className="text-[10px] font-mono text-[#a8a49a] mt-2">
                  Scale: {currentCaratSpec.diameterMm}
                </span>
              </div>

              <div className="text-xs space-y-1 text-left">
                <div className="text-[10px] uppercase tracking-wider text-[#7a756b]">Application:</div>
                <div className="text-[#f4f2ee] font-medium text-xs max-w-[200px] leading-tight">
                  {currentCaratSpec.idealApplication}
                </div>
              </div>
            </div>

          </div>

          {/* Calibrated Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Approx Diameter</span>
              <span className="text-sm font-mono text-[#f4f2ee] mt-0.5 block">{currentCaratSpec.diameterMm}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Table & Depth</span>
              <span className="text-sm font-mono text-[#f4f2ee] mt-0.5 block">{currentCaratSpec.tablePct} / {currentCaratSpec.depthPct}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Master Color & Clarity</span>
              <span className="text-sm font-mono text-[#c9a86a] mt-0.5 block">{currentCaratSpec.avgColor} • {currentCaratSpec.avgClarity}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#635e53] block">Laboratory Dossier</span>
              <button 
                onClick={() => onViewCert(currentCaratSpec.igiReportExample)}
                className="text-xs text-[#dcd7cc] hover:text-[#c9a86a] flex items-center gap-1 mt-0.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3 text-[#c9a86a]" />
                <span className="underline decoration-[#c9a86a]/40">IGI {currentCaratSpec.igiReportExample}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Shape Selector Strip */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8e8a80]">
              Select Diamond Cut & Silhouette:
            </span>
            <span className="text-xs text-[#c9a86a] font-medium">
              Currently Selected: {selectedShape}
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {DIAMOND_SHAPES.map((shape) => {
              const isSelected = shape.name === selectedShape;
              return (
                <button
                  key={shape.name}
                  onClick={() => onSelectShape(shape.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#c9a86a] bg-[#16140f] text-[#f4f2ee] shadow-[0_0_15px_rgba(201,168,106,0.15)]'
                      : 'border-[#201d17] bg-[#0c0c0c] text-[#8e8a80] hover:border-[#383327] hover:text-[#dcd7cc]'
                  }`}
                  title={shape.description}
                >
                  <svg viewBox="0 0 100 100" className="w-7 h-7 mb-1 stroke-current fill-none stroke-[2]">
                    <path d={shape.svgPath} />
                  </svg>
                  <span className="text-[10px] tracking-wider uppercase font-medium mt-1">
                    {shape.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Category Tabs (4-Across Grid Categories) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {[
            { id: 'all', label: 'All Creations' },
            { id: 'solitaires', label: 'Solitaires (Rings & Pendants)' },
            { id: 'side-stones', label: 'Side-Stone Settings' },
            { id: 'tennis-eternity', label: 'Tennis & Eternity Bands' },
            { id: 'curated-layouts', label: 'Curated Layouts & Pairs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === tab.id
                  ? 'border-b-2 border-[#c9a86a] text-[#f4f2ee] font-medium'
                  : 'text-[#7e796e] hover:text-[#c5c1b8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. Products Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0b0b0b] border border-[#1f1c16] hover:border-[#c9a86a]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                {/* Product Image on Dark Backdrop */}
                <div className="relative aspect-square overflow-hidden bg-[#070707]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 bg-black/70 backdrop-blur-md border border-[#2a2620] text-[#c9a86a]">
                      {product.tag}
                    </span>
                  )}

                  {/* Cert pill */}
                  <span className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 bg-[#12110e] border border-[#332a19] text-[#e6ca85]">
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
                    className="p-2 text-[#8e8a80] hover:text-[#c9a86a] border border-[#201d17] hover:border-[#c9a86a]/40 transition-colors"
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
