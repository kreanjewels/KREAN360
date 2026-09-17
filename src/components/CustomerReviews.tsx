import React from 'react';
import { Star, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      author: 'Eleanor Vance',
      location: 'New York, NY',
      verified: 'Verified Buyer • 2.50 ct Oval Solitaire',
      rating: 5,
      date: 'February 2026',
      headline: '“The fire and scintillation outshines my family heirloom.”',
      quote:
        'When I received the insured package, the presentation alone was museum-grade. The IGI report matched the laser inscription on the girdle perfectly under a 20x loupe. Everyone assumes it cost $35,000.',
    },
    {
      id: 2,
      author: 'Marcus Sterling',
      location: 'London, UK',
      verified: 'Verified Buyer • 5.00 ct TW Bezel Tennis Bracelet',
      rating: 5,
      date: 'January 2026',
      headline: '“Masterful bench work and flawless symmetry.”',
      quote:
        'Having visited the Antwerp diamond bourse for years, I was skeptical about CVD lab-grown diamonds until I ordered from KREAN JEWELS. The stones are colorless, crisp Type IIa with zero eye visible inclusions. Exceptional value.',
    },
    {
      id: 3,
      author: 'Sophia Chen-Ross',
      location: 'San Francisco, CA',
      verified: 'Verified Buyer • Custom 3-Stone Emerald Ring',
      rating: 5,
      date: 'December 2025',
      headline: '“The concierge team guided our design journey seamlessly.”',
      quote:
        'From initial 3D CAD renders to stone selection, the team was deeply communicative. Knowing our diamond was grown with renewable energy and zero mining conflict gave us tremendous peace of mind.',
    },
  ];

  return (
    <section 
      id="reviews-section"
      className="relative z-20 w-full bg-[#090909] py-24 md:py-32 px-6 md:px-12 border-b border-[#1c1914]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c9a86a] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Verified Collector Experiences</span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#f4f2ee] font-normal tracking-[0.03em] leading-tight">
            Celebrated by Fine Jewelry Connoisseurs
          </h2>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[#c9a86a]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#c9a86a]" />
            ))}
            <span className="text-xs uppercase tracking-widest text-[#ded8cc] ml-2 font-mono">
              4.98 / 5.0 (280+ Reviews)
            </span>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-sm bg-[#0e0e0e] border border-[#231f18] hover:border-[#c9a86a]/40 transition-colors flex flex-col justify-between shadow-xl space-y-6"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1 text-[#c9a86a]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c9a86a]" />
                  ))}
                  <span className="text-[10px] text-[#716c61] ml-2 font-mono">{rev.date}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-normal tracking-[0.025em] leading-snug">
                  {rev.headline}
                </h3>

                <p className="text-xs text-[#a39e93] font-light leading-relaxed">
                  {rev.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#1c1914] flex flex-col space-y-1">
                <span className="font-serif-luxury text-base text-[#f4f2ee]">
                  {rev.author}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-[#c9a86a]">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="font-mono tracking-wider">{rev.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
