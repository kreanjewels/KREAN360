import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { DIAMOND_SHAPES } from '../../data/diamondData';

interface CustomInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'diamond' | 'jewelry';
  prefilledItemName?: string;
}

export const CustomInquiryModal: React.FC<CustomInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'diamond',
  prefilledItemName,
}) => {
  const [inquiryType, setInquiryType] = useState<'diamond' | 'jewelry'>(defaultType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shape, setShape] = useState('Round');
  const [carat, setCarat] = useState('2.00 - 3.00 ct');
  const [metal, setMetal] = useState('18K Yellow Gold');
  const [budget, setBudget] = useState('$5,000 - $10,000');
  const [notes, setNotes] = useState(prefilledItemName ? `Inquiring about: ${prefilledItemName}` : '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-10 text-left overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full border border-[#c9a86a] flex items-center justify-center text-[#c9a86a]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-3xl text-[#f4f2ee]">
              Commission Dossier Transmitted
            </h3>
            <p className="text-xs text-[#8e8a80] max-w-md font-light leading-relaxed">
              Thank you, {name || 'valued patron'}. Our Master Diamantaire has received your specifications and will respond with initial 3D render projections and calibrated stone options within 1 business day.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 bg-[#c9a86a] text-[#080808] text-xs uppercase tracking-widest font-semibold"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Atelier Commission</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-light">
              Initiate Your Custom Commission
            </h3>

            <p className="text-xs text-[#8e8a80] mt-1 font-light leading-relaxed">
              Specify your dream diamond cut or finished jewelry design. Direct one-on-one lapidary guidance.
            </p>

            {/* Type selector */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setInquiryType('diamond')}
                className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-medium border transition-colors ${
                  inquiryType === 'diamond'
                    ? 'border-[#c9a86a] bg-[#16140e] text-[#f4f2ee]'
                    : 'border-[#201d17] text-[#8e8a80] hover:text-[#dcd7cc]'
                }`}
              >
                Custom Loose Diamond
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('jewelry')}
                className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-medium border transition-colors ${
                  inquiryType === 'jewelry'
                    ? 'border-[#c9a86a] bg-[#16140e] text-[#f4f2ee]'
                    : 'border-[#201d17] text-[#8e8a80] hover:text-[#dcd7cc]'
                }`}
              >
                Custom Fine Jewelry Piece
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Preferred Cut / Shape
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  >
                    {DIAMOND_SHAPES.map((s) => (
                      <option key={s.name} value={s.name}>{s.name} Brilliant</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Target Carat Weight
                  </label>
                  <select
                    value={carat}
                    onChange={(e) => setCarat(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  >
                    <option value="0.50 - 1.00 ct">0.50 - 1.00 Carat</option>
                    <option value="1.00 - 2.00 ct">1.00 - 2.00 Carat</option>
                    <option value="2.00 - 3.00 ct">2.00 - 3.00 Carat</option>
                    <option value="3.00 - 5.00 ct">3.00 - 5.00 Carat</option>
                    <option value="5.00 - 10.00+ ct">5.00 - 10.00+ Carat (Apex)</option>
                  </select>
                </div>
              </div>

              {inquiryType === 'jewelry' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                      Precious Metal
                    </label>
                    <select
                      value={metal}
                      onChange={(e) => setMetal(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                    >
                      <option value="18K Yellow Gold">18K Yellow Gold</option>
                      <option value="18K White Gold">18K White Gold</option>
                      <option value="18K Rose Gold">18K Rose Gold</option>
                      <option value="Platinum 950">Platinum 950</option>
                      <option value="14K Gold">14K Gold</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                      Estimated Budget (USD)
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                    >
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+ (High Jewelry)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lady / Lord / Full Name"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                  Design Notes or Reference Description
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details regarding setting style, ring size, prong preference, or special deadline..."
                  className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider text-[#8e8a80] hover:text-[#f4f2ee]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#c9a86a] text-[#080808] hover:bg-[#e6ca85] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Commission Request</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
