import React, { useState, useMemo } from 'react';
import { X, Search, Gem, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS_CATALOG, DIAMOND_SHAPES } from '../../data/diamondData';
import { JewelryProduct, DiamondShape } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: JewelryProduct) => void;
  onSelectShape: (shape: DiamondShape) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectShape,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return PRODUCTS_CATALOG.slice(0, 4);
    const term = searchTerm.toLowerCase();
    return PRODUCTS_CATALOG.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.shape.toLowerCase().includes(term) ||
        p.metal.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.certNumber.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const matchedShapes = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return DIAMOND_SHAPES.filter((s) => s.name.toLowerCase().includes(term));
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-20">
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#2a241b] rounded-sm shadow-2xl p-6 sm:p-8 text-left overflow-hidden animate-fadeIn">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium mb-1">
          <Search className="w-3.5 h-3.5" />
          <span>Atelier Vault Search</span>
        </div>

        <h3 className="font-serif-luxury text-2xl text-[#f4f2ee]">
          Search Diamond & Jewelry Inventory
        </h3>

        {/* Input box */}
        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#635e53]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by shape (Emerald, Round), carat, ring, cert #..."
            className="w-full pl-10 pr-4 py-3 bg-[#080808] border border-[#26221a] focus:border-[#c9a86a] text-sm text-[#f4f2ee] outline-none"
          />
        </div>

        {/* Matched Shapes */}
        {matchedShapes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#1f1c16]">
            <span className="text-[10px] uppercase tracking-wider text-[#6b665c] block mb-2">
              Diamond Cuts:
            </span>
            <div className="flex flex-wrap gap-2">
              {matchedShapes.map((s) => (
                <button
                  key={s.name}
                  onClick={() => {
                    onSelectShape(s.name);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#14120e] border border-[#2a241b] text-xs text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#080808] transition-colors flex items-center gap-1.5"
                >
                  <Gem className="w-3 h-3" />
                  <span>{s.name} Diamond Cut</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="mt-6 space-y-3 max-h-[360px] overflow-y-auto pr-1">
          <span className="text-[10px] uppercase tracking-wider text-[#6b665c] block">
            {searchTerm ? `Matching Creations (${filteredProducts.length})` : 'Popular Atelier Creations:'}
          </span>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#716c61]">
              No direct stock matches for "{searchTerm}". You can request a bespoke diamond cut.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="group p-3 bg-[#080808] hover:bg-[#12100c] border border-[#1f1c16] hover:border-[#c9a86a]/40 rounded-sm flex items-center gap-4 cursor-pointer transition-colors"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded-sm border border-[#201d17] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider text-[#c9a86a]">
                      {p.shape} • {p.caratWeight} ct
                    </span>
                    <span className="text-[9px] text-[#6b665c] font-mono">
                      {p.colorGrade}/{p.clarityGrade}
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-[#f4f2ee] truncate group-hover:text-[#c9a86a] transition-colors">
                    {p.name}
                  </h4>
                  <div className="text-[10px] text-[#716c61]">{p.metal}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs text-[#f4f2ee]">${p.priceUsd.toLocaleString()}</div>
                  <span className="text-[9px] text-[#c9a86a] flex items-center gap-0.5 justify-end">
                    View <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
