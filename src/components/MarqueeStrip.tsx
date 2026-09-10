import React from 'react';

const PHRASES = [
  'Lab-Grown Diamonds',
  '5Cs of Customer Care',
  'Elevated Choices',
  'Superior Craftsmanship',
  'Grown with Purpose',
  'IGI & HRD Graded',
  'Recycled Fine Metals',
  'Antwerp & Mumbai Ateliers',
  'Zero Conflict Sourcing',
];

export const MarqueeStrip: React.FC = () => {
  return (
    <div 
      id="marquee-strip"
      className="relative z-20 w-full overflow-hidden bg-[#070707] py-6 border-y border-[#1a1712] select-none"
    >
      {/* Horizontal looping ticker container */}
      <div className="flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Render twice for seamless infinite loop */}
        {[...PHRASES, ...PHRASES, ...PHRASES].map((phrase, idx) => (
          <div key={idx} className="flex items-center space-x-6 mx-4">
            <span className="font-serif-luxury text-sm md:text-base tracking-[0.25em] uppercase text-[#cfcac0] font-light hover:text-[#c9a86a] transition-colors whitespace-nowrap">
              {phrase}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 border border-[#c9a86a] opacity-80" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};
