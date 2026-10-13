/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, NailShape, NailLength, Order, OrderItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularProductsCarousel } from './components/PopularProductsCarousel';
import { CatalogSection } from './components/CatalogSection';
import { SurMesureSection } from './components/SurMesureSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ValueProps } from './components/ValueProps';
import { HowItWorks } from './components/HowItWorks';
import { SizingGuideSection } from './components/SizingGuideSection';
import { DeliveryInfoSection } from './components/DeliveryInfoSection';
import { AboutContactSection } from './components/AboutContactSection';
import { OrderWizard } from './components/OrderWizard';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { Footer } from './components/Footer';
import { saveOrder } from './services/orderStorage';
import { PRODUCTS_CATALOG } from './data/catalog';
import { Home, ShoppingBag, Ruler, MapPin, Sparkles, ShieldCheck, Heart, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Order Wizard state
  const [wizardOpen, setWizardOpen] = useState<boolean>(false);
  const [wizardInitialItem, setWizardInitialItem] = useState<Partial<OrderItem> | undefined>(undefined);

  // Completed order for confirmation modal
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Client order lookup modal
  const [lookupModalOpen, setLookupModalOpen] = useState<boolean>(false);

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('celia_admin_auth') === 'true';
  });
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  // Triggering order flow from a specific product
  const handleProceedToOrder = (
    product: Product,
    shape: NailShape = 'Amande',
    length: NailLength = 'Moyen'
  ) => {
    setSelectedProduct(null);
    setWizardInitialItem({
      productId: product.id,
      productName: product.name,
      isCustomCreation: false,
      shape,
      length,
      finish: 'Brillant',
      extraDecors: [],
      unitPriceDZD: product.basePriceDZD,
    });
    setWizardOpen(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Triggering custom order from scratch
  const handleCustomOrderClick = () => {
    setSelectedProduct(null);
    setWizardInitialItem({
      productName: 'Création personnalisée sur mesure',
      isCustomCreation: true,
      shape: 'Amande',
      length: 'Moyen',
      finish: 'Brillant',
      extraDecors: [],
      unitPriceDZD: 2800,
    });
    setWizardOpen(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // When order is successfully created in the wizard
  const handleOrderCreated = (order: Order) => {
    saveOrder(order);
    setWizardOpen(false);
    setCompletedOrder(order);
  };

  const handleAdminNav = () => {
    if (isAdminLoggedIn) {
      setActiveTab('admin');
    } else {
      setLoginModalOpen(true);
    }
  };

  // If in admin mode and logged in
  if (activeTab === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdminLoggedIn(false);
          sessionStorage.removeItem('celia_admin_auth');
          setActiveTab('home');
        }}
        onBackToShop={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfaf8] text-[#2e1a23] selection:bg-[#fceee9] selection:text-[#a85243]">
      
      {/* Top Header */}
      <Header
        activeTab={wizardOpen ? 'order_wizard' : activeTab}
        onSelectTab={(tab) => {
          if (tab === 'admin') {
            handleAdminNav();
          } else if (tab === 'tracking') {
            setLookupModalOpen(true);
          } else {
            setWizardOpen(false);
            setActiveTab(tab);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* If Order Wizard is active */}
        {wizardOpen ? (
          <OrderWizard
            initialItem={wizardInitialItem}
            onOrderCreated={handleOrderCreated}
            onCancel={() => setWizardOpen(false)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <>
                <Hero
                  onExploreCatalog={() => {
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setActiveTab('catalog');
                  }}
                  onOpenHowItWorks={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* Section 5 de la consigne : Nouveautés & Coups de cœur carrousel immédiatement sous le banner */}
                <PopularProductsCarousel
                  products={PRODUCTS_CATALOG}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onDirectOrder={(p) => handleProceedToOrder(p)}
                  onViewAllCatalog={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <ValueProps />

                <CatalogSection
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onDirectOrder={(p) => handleProceedToOrder(p)}
                  onCustomOrderClick={() => {
                    setActiveTab('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Section Galerie Instagram @sb.renails & Créations portées par les clientes */}
                <InstagramFeedSection
                  onOrderProduct={(p) => handleProceedToOrder(p)}
                  onCustomOrder={() => handleCustomOrderClick()}
                  onExploreCatalog={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <HowItWorks
                  onStartOrder={() => {
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenMeasurements={() => {
                    setActiveTab('measurements');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <SizingGuideSection
                  onStartCustomOrder={() => {
                    setActiveTab('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <DeliveryInfoSection />
              </>
            )}

            {activeTab === 'catalog' && (
              <div className="pt-6">
                <CatalogSection
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onDirectOrder={(p) => handleProceedToOrder(p)}
                  onCustomOrderClick={() => {
                    setActiveTab('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="pt-4">
                <InstagramFeedSection
                  onOrderProduct={(p) => handleProceedToOrder(p)}
                  onCustomOrder={() => handleCustomOrderClick()}
                  onExploreCatalog={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="pt-4">
                <SurMesureSection
                  onSelectCatalog={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'measurements' && (
              <div className="pt-6">
                <SizingGuideSection
                  onStartCustomOrder={() => {
                    setActiveTab('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="pt-6">
                <DeliveryInfoSection />
              </div>
            )}

            {activeTab === 'about' && (
              <div className="pt-4">
                <AboutContactSection
                  initialView="about"
                  onExploreCatalog={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="pt-4">
                <AboutContactSection
                  initialView="contact"
                  onExploreCatalog={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProceedToOrder={(product, shape, length) => handleProceedToOrder(product, shape, length)}
      />

      {/* Order Confirmation Modal with WhatsApp 1-Click link */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onBackToHome={() => {
          setCompletedOrder(null);
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          sessionStorage.setItem('celia_admin_auth', 'true');
          setLoginModalOpen(false);
          setActiveTab('admin');
        }}
      />

      {/* Client Order Lookup Modal */}
      <OrderLookupModal
        isOpen={lookupModalOpen}
        onClose={() => setLookupModalOpen(false)}
      />

      {/* Mobile Sticky Bottom Navigation (Optimized for one-thumb phone usage) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EEDDE3] px-2 py-1.5 flex items-center justify-around text-[10px] font-medium text-[#6F656A]">
        <button
          onClick={() => { setWizardOpen(false); setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${activeTab === 'home' && !wizardOpen ? 'text-[#C94F7C] font-bold' : 'hover:text-[#29242A]'}`}
        >
          <Home className="w-4 h-4" />
          <span>Accueil</span>
        </button>

        <button
          onClick={() => { setWizardOpen(false); setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${activeTab === 'catalog' && !wizardOpen ? 'text-[#C94F7C] font-bold' : 'hover:text-[#29242A]'}`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Catalogue</span>
        </button>

        <button
          onClick={() => { setWizardOpen(false); setActiveTab('custom'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${activeTab === 'custom' && !wizardOpen ? 'text-[#C94F7C] font-bold' : 'hover:text-[#29242A]'}`}
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Sur mesure</span>
        </button>

        <button
          onClick={() => { setWizardOpen(false); setActiveTab('measurements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${activeTab === 'measurements' && !wizardOpen ? 'text-[#C94F7C] font-bold' : 'hover:text-[#29242A]'}`}
        >
          <Ruler className="w-4 h-4" />
          <span>Mesures</span>
        </button>

        <button
          onClick={() => { setWizardOpen(false); setActiveTab('delivery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${activeTab === 'delivery' && !wizardOpen ? 'text-[#C94F7C] font-bold' : 'hover:text-[#29242A]'}`}
        >
          <MapPin className="w-4 h-4" />
          <span>Retrait 0 DA</span>
        </button>
      </div>

      {/* Floating Instagram & WhatsApp Buttons */}
      <FloatingContactButtons />

      {/* Footer */}
      <Footer onNav={(tab) => {
        if (tab === 'admin') {
          handleAdminNav();
        } else {
          setWizardOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }} />

    </div>
  );
}
