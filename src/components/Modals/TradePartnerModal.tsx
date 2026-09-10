import React, { useState } from 'react';
import { X, Building2, CheckCircle2, Send, ShieldCheck, Globe } from 'lucide-react';

interface TradePartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TradePartnerModal: React.FC<TradePartnerModalProps> = ({ isOpen, onClose }) => {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [country, setCountry] = useState('United States');
  const [annualVolume, setAnnualVolume] = useState('$50,000 - $250,000');
  const [businessType, setBusinessType] = useState('Independent Retail Jeweler');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-10 text-left overflow-hidden">
        
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
              Trade Verification Requested
            </h3>
            <p className="text-xs text-[#8e8a80] max-w-md font-light leading-relaxed">
              Thank you for applying to KREAN JEWELS Trade Sourcing. Our B2B Account Director will verify your tax credentials and activate your wholesale API feed access within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 bg-[#c9a86a] text-[#080808] text-xs uppercase tracking-widest font-semibold"
            >
              Close Portal
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Wholesaler & Manufacturer Registration</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-light">
              Apply for Trade Access & Diamond Memo
            </h3>

            <p className="text-xs text-[#8e8a80] mt-1 font-light leading-relaxed">
              Unlock Tier 1 wholesale pricing, live API inventory feeds, and customized private-label manufacturing terms.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Fine Jewelers LLC"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    VAT / Tax ID / RapNet ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="US EIN / EU VAT / RapNet #"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Business Model
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  >
                    <option value="Independent Retail Jeweler">Independent Retail Jeweler</option>
                    <option value="Jewelry Chain / Multiple Doors">Jewelry Chain / Multiple Doors</option>
                    <option value="Custom Jewelry Designer">Custom Jewelry Designer / Atelier</option>
                    <option value="Diamond Wholesaler / Trader">Diamond Wholesaler / Trader</option>
                    <option value="E-Commerce Brand">E-Commerce Brand</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Estimated Annual Sourcing Volume
                  </label>
                  <select
                    value={annualVolume}
                    onChange={(e) => setAnnualVolume(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  >
                    <option value="Under $50,000">Under $50,000</option>
                    <option value="$50,000 - $250,000">$50,000 - $250,000</option>
                    <option value="$250,000 - $1,000,000">$250,000 - $1,000,000</option>
                    <option value="$1,000,000+">$1,000,000+ (High Volume Contract)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Authorized Representative *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full Legal Name"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buyer@acmejewels.com"
                    className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-1">
                  Primary Sourcing Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Seeking calibrated 2.0-3.0ct Oval and Round Type IIa parcels, private label tennis bracelet manufacturing in 14K white gold..."
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
                  <span>Submit Trade Application</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
