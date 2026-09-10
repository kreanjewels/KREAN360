import React, { useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from './components/Header';
import { HeroVideo } from './components/HeroVideo';
import { DiamondScrubber } from './components/DiamondScrubber';
import { TrustBar } from './components/TrustBar';
import { MakingProcess } from './components/MakingProcess';
import { CalibratedDiamonds } from './components/CalibratedDiamonds';
import { TraceabilitySection } from './components/TraceabilitySection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { HeritageAbout } from './components/HeritageAbout';
import { CustomDesignJourney } from './components/CustomDesignJourney';
import { TradeSourcing } from './components/TradeSourcing';
import { EditorialSection } from './components/EditorialSection';
import { NewsletterBand } from './components/NewsletterBand';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/Modals/CartDrawer';
import { CertModal } from './components/Modals/CertModal';
import { CustomInquiryModal } from './components/Modals/CustomInquiryModal';
import { TradePartnerModal } from './components/Modals/TradePartnerModal';
import { SearchModal } from './components/Modals/SearchModal';
import { ArticleModal } from './components/Modals/ArticleModal';
import { LegalModal } from './components/Modals/LegalModal';

import { CartItem, DiamondShape, JewelryProduct } from './types';
import { PRODUCTS_CATALOG } from './data/diamondData';

export function App() {
  // State for interactive features & modals
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_CATALOG[0], quantity: 1 } // seeded with 1 elegant piece
  ]);
  const [selectedShape, setSelectedShape] = useState<DiamondShape>('Round');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [inspectedCertNum, setInspectedCertNum] = useState('LG-92841029');
  const [isTradeOpen, setIsTradeOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  
  const [isCustomInquiryOpen, setIsCustomInquiryOpen] = useState(false);
  const [customInquiryType, setCustomInquiryType] = useState<'diamond' | 'jewelry'>('diamond');
  const [customPrefilledItem, setCustomPrefilledItem] = useState<string | undefined>(undefined);

  const [legalTopic, setLegalTopic] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (product: JewelryProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Triggers
  const handleViewCert = (certNum: string) => {
    setInspectedCertNum(certNum);
    setIsCertOpen(true);
  };

  const handleRequestCustomDiamond = () => {
    setCustomInquiryType('diamond');
    setCustomPrefilledItem(undefined);
    setIsCustomInquiryOpen(true);
  };

  const handleRequestCustomJewelry = (productName?: string) => {
    setCustomInquiryType('jewelry');
    setCustomPrefilledItem(productName);
    setIsCustomInquiryOpen(true);
  };

  const scrollToExplore = () => {
    const elem = document.getElementById('calibrated-diamonds-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f2ee] selection:bg-[#c9a86a] selection:text-[#080808] relative">
      
      {/* 1. Sticky Luxury Navigation Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrade={() => setIsTradeOpen(true)}
        onOpenCert={() => {
          setInspectedCertNum('LG-92841029');
          setIsCertOpen(true);
        }}
        onSelectShape={(shape) => setSelectedShape(shape)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      <main>
        {/* 2. Full-bleed Hero Video with scroll indicator & serif poetic lines */}
        <HeroVideo onExploreClick={scrollToExplore} />

        {/* 3. Pinned Scroll-Scrubbed 360° Diamond Centerpiece with crossfading headlines */}
        <DiamondScrubber />

        {/* 4. Certifying Bodies Trust Bar (IGI, HRD Antwerp, Type IIa, SCS-007) */}
        <TrustBar onOpenCertModal={() => setIsCertOpen(true)} />

        {/* 5. "Grown with Purpose" 5-stage making process */}
        <MakingProcess />

        {/* 6. "Your Vision, Our Diamonds" (Carat slider, shape picker, 4-category grid) */}
        <CalibratedDiamonds
          selectedShape={selectedShape}
          onSelectShape={setSelectedShape}
          onAddToCart={handleAddToCart}
          onViewCert={handleViewCert}
          onRequestCustom={handleRequestCustomJewelry}
        />

        {/* 7. "Certified. Consistent." quiet cinematic traceability statement */}
        <TraceabilitySection onOpenCertGuide={() => setIsCertOpen(true)} />

        {/* 8. Repeating Value-Prop Marquee */}
        <MarqueeStrip />

        {/* 9. Heritage & "Since 2018" grand typographic stat treatment */}
        <HeritageAbout onOpenStoryModal={() => setIsArticleOpen(true)} />

        {/* 10. 6-Step Custom Design Journey & Commission CTAs */}
        <CustomDesignJourney
          onRequestCustomDiamond={handleRequestCustomDiamond}
          onRequestCustomJewelry={() => handleRequestCustomJewelry()}
        />

        {/* 11. Sourcing for the Trade & B2B Manufacturer Division */}
        <TradeSourcing onOpenTradeModal={() => setIsTradeOpen(true)} />

        {/* 12. Editorial Journal Article Card */}
        <EditorialSection onOpenArticleModal={() => setIsArticleOpen(true)} />

        {/* 13. "Stay Connected" Newsletter & Concierge Band */}
        <NewsletterBand />
      </main>

      {/* 14. Detailed Luxury Footer */}
      <Footer
        onOpenLegal={(topic) => setLegalTopic(topic)}
        onOpenCert={() => setIsCertOpen(true)}
        onOpenTrade={() => setIsTradeOpen(true)}
      />

      {/* Modals and Side Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          handleRequestCustomJewelry('Parcels in Cart Reservation');
        }}
      />

      <CertModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        initialCertNumber={inspectedCertNum}
      />

      <CustomInquiryModal
        isOpen={isCustomInquiryOpen}
        onClose={() => setIsCustomInquiryOpen(false)}
        defaultType={customInquiryType}
        prefilledItemName={customPrefilledItem}
      />

      <TradePartnerModal
        isOpen={isTradeOpen}
        onClose={() => setIsTradeOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          handleAddToCart(product);
        }}
        onSelectShape={(shape) => {
          setSelectedShape(shape);
          scrollToExplore();
        }}
      />

      <ArticleModal
        isOpen={isArticleOpen}
        onClose={() => setIsArticleOpen(false)}
      />

      <LegalModal
        isOpen={!!legalTopic}
        topic={legalTopic || ''}
        onClose={() => setLegalTopic(null)}
      />

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
