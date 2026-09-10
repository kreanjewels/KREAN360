import React from 'react';
import { X, Calendar, Clock, User, BookOpen, Share2 } from 'lucide-react';
import { EDITORIAL_ARTICLE } from '../../data/diamondData';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const article = EDITORIAL_ARTICLE;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-10 text-left max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-[#7e796e] mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#c9a86a]" />
            {article.publishedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#c9a86a]" />
            {article.readTime}
          </span>
        </div>

        <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#f4f2ee] font-light leading-tight">
          {article.title}
        </h2>

        <p className="text-xs uppercase tracking-wider text-[#c9a86a] mt-2 font-medium">
          {article.subtitle}
        </p>

        {/* Author Header */}
        <div className="flex items-center gap-3 py-4 my-4 border-y border-[#1f1c16] text-xs">
          <div className="w-9 h-9 rounded-full bg-[#1c1811] border border-[#332a19] flex items-center justify-center text-[#c9a86a]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-[#f4f2ee]">{article.author}</div>
            <div className="text-[10px] text-[#716c61]">{article.authorRole}</div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-16/9 rounded-sm overflow-hidden border border-[#26221a] my-6">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover grayscale-[10%]"
          />
        </div>

        {/* Article Body */}
        <div className="text-xs sm:text-sm text-[#b0aba0] space-y-4 font-light leading-relaxed">
          <p>
            In the lexicon of modern gemology, no distinction carries greater scientific weight than the crystallographic grading of <strong>Type IIa</strong> diamonds. While 98% of natural mined diamonds belong to Type Ia—containing clustered nitrogen atoms that impart subtle yellow fluorescence—Type IIa diamonds are chemically pure carbon crystals, entirely devoid of measurable nitrogen impurities.
          </p>

          <h4 className="font-serif-luxury text-lg text-[#f4f2ee] font-medium pt-2">
            Chemical Vapor Deposition (CVD) vs. High Pressure High Temperature (HPHT)
          </h4>

          <p>
            Within our Antwerp and Mumbai synthesis facilities, we employ customized Chemical Vapor Deposition (CVD) plasma reactors. In this method, hydrocarbon gases are ionized into a glowing plasma cloud heated to extreme temperatures in a low-pressure vacuum chamber. Single carbon atoms detach and precipitate atom-by-atom onto a natural diamond seed plate, mirroring the molecular lattice of the seed with mathematical precision.
          </p>

          <p>
            Conversely, HPHT synthesizes diamonds by subjecting carbon and metallic catalyst fluxes to 60,000 atmospheres of pressure and over 1,500°C. While HPHT excels at growing dense rough, CVD allows superior control over crystalline homogeneity, ensuring the completed gem exhibits the optical properties of the historic Golconda and Cullinan diamonds.
          </p>

          <blockquote className="border-l-2 border-[#c9a86a] pl-4 py-2 my-4 text-xs font-serif-luxury italic text-[#e6ca85]">
            "A lab-grown diamond is not an imitation. It is an authentic diamond created with atomic deliberate intent rather than accidental geological upheaval."
          </blockquote>

          <h4 className="font-serif-luxury text-lg text-[#f4f2ee] font-medium pt-2">
            Independent Verification & The Micron Inscription
          </h4>

          <p>
            Once faceted by our master lapidaries, each stone undergoes rigorous multi-spectral spectrophotometry at IGI or HRD Antwerp. An invisible laser inscribes the report registry number alongside the KREAN hallmark onto the girdle facet, readable only under 20x magnification.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-8 border-t border-[#1f1c16] flex items-center justify-between">
          <div className="flex gap-2">
            {article.tags.map((t) => (
              <span key={t} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-[#12100d] border border-[#26221a] text-[#8e8a80]">
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 border border-[#383327] text-xs uppercase tracking-wider text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-colors font-medium"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};
