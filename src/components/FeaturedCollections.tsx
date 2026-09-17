import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: 'all' | 'rings' | 'bracelets' | 'earrings' | 'pendants' | 'loose') => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCategory }) => {
  const collections = [
    {
      id: 'rings' as const,
      title: 'Engagement Rings',
      subtitle: 'Solitaires, Cathedral Mounts & Pavé Bands',
      itemCount: '24+ Certified Styles',
      image: 'https://cdn.shopify.com/s/files/1/0779/2482/7324/files/1_7_b6286605-a661-4274-98c6-05d6803d5763.jpg?v=1788161440',
      badge: 'Signature Solitaires',
    },
    {
      id: 'bracelets' as const,
      title: 'Tennis Bracelets',
      subtitle: 'Continuous Fire & Bezel-Set Precision',
      itemCount: 'Triple-Ex Matched',
      image: 'https://images.unsplash.com/photo-1611591475854-159846397397?auto=format&fit=crop&w=800&q=80',
      badge: 'Collector Favorites',
    },
    {
      id: 'pendants' as const,
      title: 'Diamond Pendants',
      subtitle: 'Bespoke Cross & Solitaire Medallions',
      itemCount: '14K & 18K Solid Gold',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      badge: 'Everyday Luxury',
    },
    {
      id: 'earrings' as const,
      title: 'Earrings & Studs',
      subtitle: 'Optically Paired Lab-Grown Solitaires',
      itemCount: 'D–F Colorless Pairs',
      image: 'https://cdn.shopify.com/s/files/1/0779/2482/7324/files/98_6.jpg?v=1788161375',
      badge: 'Calibrated Pairs',
    },
  ];

  const handleClick = (id: 'all' | 'rings' | 'bracelets' | 'earrings' | 'pendants' | 'loose') => {
    onSelectCategory(id);
    const elem = document.getElementById('calibrated-diamonds-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="featured-collections-section"
      className="relative z-20 w-full bg-[#080808] py-24 md:py-32 px-6 md:px-12 border-b border-[#1c1914]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a86a] font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Haute Joaillerie</span>
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#f4f2ee] font-normal tracking-[0.03em] mt-3 leading-tight">
              Explore Our Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#9e9a8f] mt-2 font-light max-w-xl">
              From iconic diamond solitaires to calibrated tennis bracelets, each piece is handcrafted around certified Type IIa CVD diamonds.
            </p>
          </div>

          <button
            onClick={() => handleClick('all')}
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#c9a86a] hover:text-[#faebd7] font-medium transition-colors cursor-pointer group"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Card Luxury Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collections.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="group relative h-[420px] rounded-sm overflow-hidden border border-[#231f18] hover:border-[#c9a86a]/60 transition-all duration-500 cursor-pointer bg-[#0e0e0e] flex flex-col justify-end p-6 shadow-xl"
            >
              {/* Background Photo */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-90"
              />

              {/* Gradient Scrims for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#c9a86a]/0 group-hover:bg-[#c9a86a]/10 transition-colors duration-500 pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] font-medium bg-black/70 backdrop-blur-md border border-[#332b1e] text-[#c9a86a] rounded-sm">
                  {cat.badge}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-1.5 transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#a8a396] font-mono">
                  {cat.itemCount}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-normal tracking-[0.03em] group-hover:text-[#c9a86a] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#b8b3a7] font-light line-clamp-1">
                  {cat.subtitle}
                </p>

                <div className="pt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#c9a86a] font-medium">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
