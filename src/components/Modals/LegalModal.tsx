import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, topic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-10 text-left max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal & Institutional Governance</span>
        </div>

        <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-light">
          {topic}
        </h3>

        <div className="mt-6 text-xs text-[#a8a49a] space-y-4 font-light leading-relaxed">
          {topic.includes('Privacy') && (
            <>
              <p>
                <strong>1. Information Collection & Client Discretion:</strong> KREAN JEWELS respects the utmost privacy of its private patrons and trade clients. All diamond inquiries, bespoke CAD schematics, and settlement transactions are treated under strict confidentiality agreements.
              </p>
              <p>
                <strong>2. Data Encryption:</strong> Client communications and trade portal access are encrypted via 256-bit SSL protocols. We do not sell, license, or disclose client identity rosters to third-party marketing entities.
              </p>
              <p>
                <strong>3. Regulatory Compliance:</strong> We adhere to GDPR standards for European Union transactions and US federal consumer data protection frameworks.
              </p>
            </>
          )}

          {topic.includes('Terms') && (
            <>
              <p>
                <strong>1. Acceptance of Terms:</strong> By accessing the KREAN JEWELS digital salon or entering into wholesale purchase orders, clients agree to abide by these Terms of Service.
              </p>
              <p>
                <strong>2. Stone Availability & Quotations:</strong> Loose diamond pricing reflects daily Rapaport and synthetic trading indices. Quotations remain binding for 72 hours following official transmission.
              </p>
              <p>
                <strong>3. Intellectual Property:</strong> All jewelry designs, CAD models, and website editorial contents are exclusive proprietary assets of KREAN JEWELS.
              </p>
            </>
          )}

          {topic.includes('Shipping') && (
            <>
              <p>
                <strong>1. Armored & Insured Transit:</strong> All finished fine jewelry and loose diamonds are transported exclusively via Malca-Amit, Brink’s Global Services, or FedEx Custom Critical with 100% full-value transit insurance.
              </p>
              <p>
                <strong>2. Delivery Confirmation:</strong> Shipments require government-issued photo identification and adult signature upon physical handover.
              </p>
              <p>
                <strong>3. International Customs & Duties:</strong> For global shipments outside Belgium, customs clearance documentation and certificates of origin (stating Lab-Grown Diamond under HS Code 7104.91) accompany every parcel.
              </p>
            </>
          )}

          {topic.includes('Refund') && (
            <>
              <p>
                <strong>1. 30-Day Inspection Period:</strong> For standard catalogue fine jewelry and unmounted certified diamonds, clients enjoy a 30-day examination window from confirmed delivery date.
              </p>
              <p>
                <strong>2. Laboratory Dossier Return:</strong> Items must be returned in unaltered condition with original tamper-evident security seals intact and all accompanying IGI or HRD certificates.
              </p>
              <p>
                <strong>3. Bespoke Commissions:</strong> Custom design pieces crafted to unique client specifications or personalized engravings are non-refundable once final 3D CAD approval has been authorized.
              </p>
            </>
          )}

          {topic.includes('Notice') || topic.includes('Conflict') ? (
            <>
              <p>
                <strong>1. 100% Conflict-Free Guarantee:</strong> KREAN JEWELS explicitly warrants that all diamonds sold are grown in certified plasma laboratories, completely bypassing terrestrial conflict regions, war zones, and unregulated mining supply chains.
              </p>
              <p>
                <strong>2. Sustainability & SCS-007 Verification:</strong> Our production utilizes renewable power grids and recycled precious metals in accordance with SCS-007 Climate Neutral Diamond standards.
              </p>
            </>
          ) : null}

          {topic.includes('Contact') && (
            <>
              <p>
                <strong>Antwerp Atelier:</strong> Hoveniersstraat 53, Diamond District, 2018 Antwerp, Belgium.<br />
                <strong>Mumbai Diamond Bourse:</strong> Tower C, Bandra Kurla Complex, Mumbai 400051.<br />
                <strong>Direct Desk:</strong> +1 (800) 845-KREAN | concierge@kreanjewels.com
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[#1f1c16] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-[#332e24] text-xs uppercase tracking-wider text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
