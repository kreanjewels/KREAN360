import React from 'react';
import { X, ShieldCheck, FileText, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { KREAN_OFFICIAL_DETAILS } from '../../data/kreanBrandData';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, topic }) => {
  if (!isOpen) return null;

  const isShipping = topic.toLowerCase().includes('shipping');
  const isRefund = topic.toLowerCase().includes('refund') || topic.toLowerCase().includes('exchange');
  const isPrivacy = topic.toLowerCase().includes('privacy');
  const isTerms = topic.toLowerCase().includes('terms');
  const isContact = topic.toLowerCase().includes('contact');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-10 text-left max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium mb-1">
          <FileText className="w-3.5 h-3.5" />
          <span>KREAN JEWELS Official Governance & Policies</span>
        </div>

        <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f4f2ee] font-light">
          {topic}
        </h3>

        <div className="mt-6 text-xs text-[#a8a49a] space-y-4 font-light leading-relaxed">
          {isShipping && (
            <div className="space-y-4">
              <p className="text-[#f4f2ee] font-medium">
                Official Shipping & Insurance Policy • Last Updated August 2026
              </p>
              <p>
                At KREAN JEWELS, every order is prepared, inspected through our quality assurance process, professionally packaged, and securely protected for transit.
              </p>
              <div className="p-3 bg-[#14120e] border border-[#251f15] space-y-1 text-[#d8d3c7]">
                <p><strong>Order Processing Days:</strong> Monday – Friday (Cut-off: 4:00 PM Eastern Time)</p>
                <p><strong>Standard Processing:</strong> 3–5 business days following payment verification</p>
                <p><strong>Bespoke / Custom CAD:</strong> Custom production timelines provided during consultation</p>
              </div>
              <h4 className="text-sm text-[#f4f2ee] font-medium pt-2">Global Shipping Partners & Insurance</h4>
              <p>
                We partner with <strong>FedEx, DHL Express, UPS, and USPS</strong>. Every parcel is 100% fully insured during transit against damage or loss and requires government-issued photo identification and signature upon delivery.
              </p>
              <h4 className="text-sm text-[#f4f2ee] font-medium pt-2">Estimated Delivery Times</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>United States:</strong> Express: 9–13 Business Days | Standard: 11–18 Business Days</li>
                <li><strong>International (DHL / FedEx):</strong> Express: 7–12 Business Days | Standard: 11–21 Business Days</li>
                <li><strong>Delivered Duty Paid (DDP):</strong> Available for eligible countries; import duties and taxes are prepaid prior to dispatch.</li>
              </ul>
            </div>
          )}

          {isRefund && (
            <div className="space-y-4">
              <p className="text-[#f4f2ee] font-medium">
                Return, Refund & Exchange Policy • Last Updated June 2026
              </p>
              <p>
                Given the high-value, personalized, and made-to-order nature of fine jewelry, diamonds, and bespoke creations, purchases are considered final sale upon order confirmation.
              </p>
              <div className="p-3 bg-[#14120e] border border-[#251f15] space-y-1 text-[#d8d3c7]">
                <p><strong>Non-Returnable Items:</strong> Lab-grown diamonds, certified loose stones, diamond jewelry, custom-sized rings, and personalized engraved pieces.</p>
              </div>
              <h4 className="text-sm text-[#f4f2ee] font-medium pt-2">Damaged, Defective or Transit Issue Protocol</h4>
              <p>
                If you receive an item with transit damage or material defect, you must notify KREAN JEWELS within <strong>48 hours of confirmed delivery</strong> at <em>support@kreanjewels.com</em> with your order number and an unedited continuous unboxing video showing packaging, shipping label, and the piece.
              </p>
            </div>
          )}

          {isPrivacy && (
            <div className="space-y-4">
              <p className="text-[#f4f2ee] font-medium">
                Privacy & Data Protection Policy • Last Updated July 2026
              </p>
              <p>
                KREAN JEWELS values your trust and safeguards all private patron records, bespoke CAD schematics, transaction settlement data, and diamond dossiers under 256-bit enterprise encryption.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We do not sell, rent, or trade client identity registries or diamond purchase details to third-party data brokers.</li>
                <li>Payment details are tokenized securely through PCI-DSS Level 1 payment processing gateways.</li>
                <li>Compliant with GDPR (EU/EEA) and US Federal/State consumer privacy regulations.</li>
              </ul>
            </div>
          )}

          {isTerms && (
            <div className="space-y-4">
              <p className="text-[#f4f2ee] font-medium">
                Terms of Service & Atelier Governance
              </p>
              <p>
                By accessing the KREAN JEWELS digital salon or purchasing from our collection, you agree to these Terms. All lab-grown diamonds are Type IIa CVD crystals certified by international gemological institutes (IGI / HRD) according to the 4Cs.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loose diamond quotations remain binding for 72 hours from issuance.</li>
                <li>All proprietary CAD models, editorial photography, and brand marks are intellectual property of KREAN JEWELS.</li>
              </ul>
            </div>
          )}

          {isContact && (
            <div className="space-y-3">
              <div className="p-4 bg-[#14120e] border border-[#262014] space-y-2 text-[#d8d3c7]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                  <div>
                    <strong>US Headquarters:</strong> {KREAN_OFFICIAL_DETAILS.headquarters.formattedAddress}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                  <div>
                    <strong>Antwerp Bourse Atelier:</strong> {KREAN_OFFICIAL_DETAILS.atelierAntwerp}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Mail className="w-4 h-4 text-[#c9a86a]" />
                  <a href={`mailto:${KREAN_OFFICIAL_DETAILS.contact.primaryEmail}`} className="text-[#c9a86a] hover:underline">
                    {KREAN_OFFICIAL_DETAILS.contact.primaryEmail}
                  </a>
                  <span className="text-[#686357]">|</span>
                  <a href={`mailto:${KREAN_OFFICIAL_DETAILS.contact.supportEmail}`} className="text-[#c9a86a] hover:underline">
                    {KREAN_OFFICIAL_DETAILS.contact.supportEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c9a86a]" />
                  <a href={`tel:${KREAN_OFFICIAL_DETAILS.contact.phone}`} className="text-[#f4f2ee] font-mono hover:text-[#c9a86a]">
                    {KREAN_OFFICIAL_DETAILS.contact.formattedPhone}
                  </a>
                </div>
                <div className="pt-2 text-xs text-[#8e8a80]">
                  <strong>Concierge Support Hours:</strong><br />
                  Monday – Friday: {KREAN_OFFICIAL_DETAILS.supportHours.monToFri}<br />
                  Saturday: {KREAN_OFFICIAL_DETAILS.supportHours.saturday}<br />
                  Sunday: {KREAN_OFFICIAL_DETAILS.supportHours.sunday}
                </div>
              </div>
            </div>
          )}

          {/* Conflict Free & Sustainability statement */}
          {topic.toLowerCase().includes('conflict') || topic.toLowerCase().includes('notice') ? (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-[#c9a86a]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium uppercase tracking-wider text-xs">100% Conflict-Free Lab-Grown Declaration</span>
              </div>
              <p>
                KREAN JEWELS exclusively produces CVD lab-grown diamonds, entirely bypassing terrestrial conflict zones, cartel pricing, and ecological devastation. Every diamond is grown under clean laboratory plasma conditions and is physically, chemically, and optically identical to mined diamonds.
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-8 pt-4 border-t border-[#1f1c16] flex items-center justify-between">
          <div className="text-[10px] text-[#635e53]">
            Official KREAN JEWELS Documentation
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-[#332e24] text-xs uppercase tracking-wider text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
