import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, QrCode, Search, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS_INFO } from '../../data/diamondData';

interface CertModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCertNumber?: string;
}

export const CertModal: React.FC<CertModalProps> = ({
  isOpen,
  onClose,
  initialCertNumber = 'LG-92841029',
}) => {
  const [certQuery, setCertQuery] = useState(initialCertNumber);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-10 text-left overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium mb-2">
          <ShieldCheck className="w-4 h-4 text-[#c9a86a]" />
          <span>Independent Laboratory Verification</span>
        </div>

        <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#f4f2ee] font-light">
          Diamond Certification & Grading Dossier
        </h3>

        <p className="text-xs text-[#8e8a80] mt-2 font-light leading-relaxed">
          Every diamond cut by KREAN JEWELS receives an independent physical grading report from IGI or HRD Antwerp, accompanied by a micro-laser inscription on the diamond's girdle.
        </p>

        {/* Certificate Lookup Simulation */}
        <div className="mt-6 p-4 bg-[#080808] border border-[#201d17] rounded-sm flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#635e53]" />
            <input
              type="text"
              value={certQuery}
              onChange={(e) => setCertQuery(e.target.value)}
              placeholder="Enter IGI / HRD Report Number (e.g. LG-92841029)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#0d0d0d] border border-[#26221a] focus:border-[#c9a86a] text-[#f4f2ee] outline-none font-mono"
            />
          </div>
          <button
            onClick={() => setSearched(true)}
            className="w-full sm:w-auto px-5 py-2 text-xs uppercase tracking-wider bg-[#1c1811] border border-[#383020] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-colors font-medium cursor-pointer"
          >
            Verify Stone
          </button>
        </div>

        {/* Dossier Mock Preview Card */}
        <div className="mt-6 p-6 bg-[#080808] border border-[#26221a] rounded-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f1c16]">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#635e53]">Verified Report Dossier</div>
              <div className="font-mono text-sm text-[#f4f2ee] mt-0.5 font-medium">{certQuery || 'LG-92841029'}</div>
            </div>
            <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest bg-[#151c14] border border-[#274026] text-[#69d465]">
              Active & Valid
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#635e53] block">Identification:</span>
              <span className="text-[#f4f2ee] font-medium">Lab-Grown Diamond</span>
            </div>
            <div>
              <span className="text-[10px] text-[#635e53] block">Shape & Cut:</span>
              <span className="text-[#f4f2ee] font-medium">Round Brilliant (58 Facets)</span>
            </div>
            <div>
              <span className="text-[10px] text-[#635e53] block">Color / Clarity:</span>
              <span className="text-[#c9a86a] font-medium font-mono">D / VVS1 (Type IIa)</span>
            </div>
            <div>
              <span className="text-[10px] text-[#635e53] block">Cut / Polish / Sym:</span>
              <span className="text-[#f4f2ee] font-medium font-mono">Triple Ideal (EX)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1f1c16] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8e8a80]">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#c9a86a]" />
              <span>Laser Inscription Hallmark: "LG92841029 KREAN"</span>
            </div>

            <a
              href="https://www.igi.org"
              target="_blank"
              rel="noreferrer"
              className="text-[#c9a86a] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Download Official Lab PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Summary of Lab Standards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {CERTIFICATIONS_INFO.map((c) => (
            <div key={c.name} className="p-4 bg-[#080808] border border-[#1a1712] rounded-sm space-y-1">
              <div className="font-serif-luxury text-base text-[#f4f2ee]">{c.name}</div>
              <p className="text-[11px] text-[#716c61] leading-relaxed font-light">{c.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-2.5 text-xs uppercase tracking-[0.2em] border border-[#332e24] text-[#c5c1b8] hover:text-[#f4f2ee] hover:border-[#c9a86a] transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
