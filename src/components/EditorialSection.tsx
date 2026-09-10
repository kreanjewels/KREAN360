import React from 'react';
import { EDITORIAL_ARTICLE } from '../data/diamondData';
import { BookOpen, ArrowRight, Calendar, Clock, User } from 'lucide-react';

interface EditorialSectionProps {
  onOpenArticleModal: () => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onOpenArticleModal }) => {
  const article = EDITORIAL_ARTICLE;

  return (
    <section 
      id="editorial-section"
      className="relative z-20 w-full bg-[#090909] py-28 md:py-36 px-6 md:px-12 border-b border-[#1f1c16]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1f1c16]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>Editorial Journal</span>
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#f4f2ee] font-light mt-3">
              The Diamond Gazette.
            </h2>
          </div>
          <p className="text-xs text-[#8e8a80] mt-4 md:mt-0 max-w-xs font-light leading-relaxed">
            Scholarly perspectives on gemological physics, sustainable luxury, and diamond market transparency.
          </p>
        </div>

        {/* Featured Editorial Card */}
        <div 
          onClick={onOpenArticleModal}
          className="group cursor-pointer bg-[#0c0c0c] border border-[#201d17] hover:border-[#c9a86a]/60 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 shadow-2xl"
        >
          {/* Cover Image (6 cols) */}
          <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto lg:h-[440px] overflow-hidden bg-[#070707]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Tag Badge */}
            <div className="absolute top-4 left-4 flex gap-2">
              {article.tags.slice(0, 2).map((t, idx) => (
                <span key={idx} className="text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 bg-black/80 backdrop-blur-md border border-[#2e2a22] text-[#c9a86a]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Text Content (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:pl-0 lg:pr-12 space-y-5">
            {/* Metadata bar */}
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-[#7e796e]">
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

            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#f4f2ee] font-light leading-snug group-hover:text-[#c9a86a] transition-colors">
              {article.title}
            </h3>

            <p className="text-xs uppercase tracking-wider text-[#8c7343] font-medium">
              {article.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#a8a49a] leading-relaxed font-light line-clamp-3">
              {article.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-4 border-t border-[#1f1c16] flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-[#f4f2ee]">{article.author}</div>
                <div className="text-[10px] text-[#716c61]">{article.authorRole}</div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#c9a86a] group-hover:translate-x-1 transition-transform font-medium">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
