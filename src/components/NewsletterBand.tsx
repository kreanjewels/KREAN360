import React, { useState } from 'react';
import { Mail, Check, Send, Sparkles, MessageCircle } from 'lucide-react';

export const NewsletterBand: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <section 
      id="connect-section"
      className="relative z-20 w-full bg-[#080808] py-20 px-6 md:px-12 border-b border-[#1f1c16]"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
        
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Private Atelier Dispatch</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f4f2ee] font-light max-w-2xl leading-tight">
          Stay Connected to the Diamond Horizon.
        </h2>

        <p className="text-xs sm:text-sm text-[#9e9a8f] max-w-lg font-light leading-relaxed">
          Receive exclusive invitations to private salon viewings, early access to new carat syntheses, and quarterly market analyses.
        </p>

        {/* Newsletter Signup Form */}
        <div className="w-full max-w-md">
          {isSubmitted ? (
            <div className="p-4 bg-[#12110e] border border-[#383020] rounded-sm text-center animate-fadeIn flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c9a86a] font-medium">
                <Check className="w-4 h-4 text-[#c9a86a]" />
                <span>Privileged Access Confirmed</span>
              </div>
              <p className="text-[11px] text-[#8e8a80] font-light">
                Welcome to the KREAN JEWELS circle. Your initial dossier will arrive shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#635e53]" />
                <input
                  type="email"
                  id="newsletter-email-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your confidential email..."
                  className="w-full pl-10 pr-4 py-3 bg-[#0d0d0d] border border-[#26221a] focus:border-[#c9a86a] text-xs text-[#f4f2ee] placeholder-[#5a554a] outline-none rounded-sm transition-colors"
                />
              </div>

              <button
                type="submit"
                id="newsletter-submit-btn"
                className="px-6 py-3 border border-[#c9a86a] bg-[#c9a86a] text-[#080808] hover:bg-[#e6ca85] text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer shrink-0"
              >
                Join Circle
              </button>
            </form>
          )}
        </div>

        {/* Social Icons Row & Atelier Concierge */}
        <div className="pt-6 border-t border-[#1a1712] w-full flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8e8a80]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#635e53]">Concierge Desk:</span>
            <a 
              href="https://wa.me/13364885522" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#c9a86a] flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Atelier (+1 336 488-5522)</span>
            </a>
          </div>

          <div className="flex items-center space-x-6 text-xs tracking-widest uppercase">
            <a href="#" className="hover:text-[#c9a86a] transition-colors">Instagram</a>
            <span className="text-[#383327]">•</span>
            <a href="#" className="hover:text-[#c9a86a] transition-colors">LinkedIn Trade</a>
            <span className="text-[#383327]">•</span>
            <a href="#" className="hover:text-[#c9a86a] transition-colors">YouTube Atelier</a>
          </div>
        </div>

      </div>
    </section>
  );
};
