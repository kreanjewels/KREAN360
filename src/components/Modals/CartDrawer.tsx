import React from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.product.priceUsd * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d0d] border-l border-[#26221a] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#1f1c16] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#c9a86a]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f4f2ee]">
                Selections & Diamond Reservations ({items.length})
              </span>
            </div>

            <button 
              onClick={onClose}
              className="text-[#8e8a80] hover:text-[#f4f2ee] transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#716c61]">
                <div className="w-16 h-16 rounded-full border border-[#26221a] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#5e594f]" />
                </div>
                <div className="text-sm font-serif-luxury text-[#c5c1b8]">
                  Your curation bag is empty
                </div>
                <p className="text-xs text-[#716c61] max-w-xs font-light">
                  Explore our certified calibrated diamonds or finished fine jewelry to add selections.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="p-4 bg-[#080808] border border-[#1f1c16] rounded-sm flex gap-4 items-center"
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-sm border border-[#26221a] shrink-0" 
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] uppercase tracking-wider text-[#c9a86a]">
                      {product.certBody} • {product.certNumber}
                    </div>
                    <h4 className="text-xs font-medium text-[#f4f2ee] truncate mt-0.5">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-[#8e8a80] mt-0.5">
                      {product.caratWeight.toFixed(2)} ct • {product.shape}
                    </div>
                    <div className="text-xs font-mono text-[#e6ca85] mt-1">
                      ${(product.priceUsd * quantity).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#635e53] hover:text-red-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="flex items-center border border-[#201d17] text-xs font-mono">
                      <button
                        onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                        className="px-2 py-0.5 text-[#8e8a80] hover:text-[#f4f2ee]"
                      >
                        -
                      </button>
                      <span className="px-2 text-[#f4f2ee]">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="px-2 py-0.5 text-[#8e8a80] hover:text-[#f4f2ee]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#1f1c16] bg-[#090909] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-[#8e8a80]">Estimated Value:</span>
                <span className="font-mono text-base font-semibold text-[#f4f2ee]">
                  ${totalAmount.toLocaleString()} USD
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#716c61]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9a86a]" />
                <span>Includes insured vault shipping & original laboratory dossier.</span>
              </div>

              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 border border-[#c9a86a] bg-[#c9a86a] text-[#080808] hover:bg-[#e6ca85] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Inquire & Reserve Parcel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
