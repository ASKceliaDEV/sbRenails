import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  cartCount = 0,
  onOpenCart,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNav = (tab: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'catalog', label: 'Catalogue' },
    { id: 'custom', label: 'Sur mesure' },
    { id: 'measurements', label: 'Guide des tailles' },
    { id: 'tracking', label: 'Suivre ma commande' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EEDDE3] shadow-xs">
      {/* 1. Barre d'annonce : Hauteur réduite, fond rose pastel, texte centré */}
      <div className="bg-[#F9E5EC] text-[#C94F7C] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-1.5 border-b border-[#EEDDE3]/60">
        <span className="text-[#C94F7C]">♥</span>
        <span>Livraison disponible partout en Algérie • Paiement à la livraison</span>
        <span className="text-[#C94F7C]">♥</span>
      </div>

      {/* 2. Navigation principale : Fond blanc, logo à gauche, liens au centre, icônes à droite */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo SB Renails à gauche en conservant ses proportions */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none text-left shrink-0 py-1"
            aria-label="SB Renails Accueil"
          >
            <BrandLogo size="md" />
          </button>

          {/* Liens de navigation au centre (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 justify-center flex-1 px-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative py-2 text-xs xl:text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#29242A] font-semibold'
                      : 'text-[#6F656A] hover:text-[#C94F7C]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Soulignement rose discret sur la page active */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C94F7C] rounded-full animate-in fade-in duration-150" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Icônes d'action à droite : Recherche, Panier, et Menu Mobile */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Icône Recherche */}
            <button
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else setSearchOpen(!searchOpen);
              }}
              className="p-2 text-[#29242A] hover:text-[#C94F7C] hover:bg-[#FFF5F8] rounded-full transition-colors cursor-pointer"
              aria-label="Rechercher un modèle"
              title="Rechercher"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Icône Panier */}
            <button
              onClick={() => {
                if (onOpenCart) onOpenCart();
                else handleNav('catalog');
              }}
              className="relative p-2 text-[#29242A] hover:text-[#C94F7C] hover:bg-[#FFF5F8] rounded-full transition-colors cursor-pointer"
              aria-label="Voir le panier"
              title="Mon panier"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C94F7C] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Accès créatrice discret */}
            <button
              onClick={() => handleNav('admin')}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#6F656A] hover:text-[#C94F7C] hover:bg-[#F9E5EC] transition-colors border border-[#EEDDE3]"
              title="Espace réservé à la créatrice"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C94F7C]" />
              <span className="hidden xl:inline">Atelier</span>
            </button>

            {/* Menu Hamburger (Mobile & Tablette) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#29242A] hover:text-[#C94F7C] hover:bg-[#FFF5F8] rounded-lg transition-colors cursor-pointer"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Barre de recherche intégrée déroulante */}
        {searchOpen && (
          <div className="py-2.5 border-t border-[#EEDDE3] animate-in fade-in duration-150">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Rechercher un modèle, couleur, forme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNav('catalog');
                    setSearchOpen(false);
                  }
                }}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF5F8] border border-[#EEDDE3] rounded-full text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#6F656A] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation (sans débordement) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EEDDE3] px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in fade-in duration-200">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#F9E5EC] text-[#C94F7C] font-semibold'
                    : 'text-[#29242A] hover:bg-[#FFF5F8]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <Heart className="w-3.5 h-3.5 fill-[#C94F7C] text-[#C94F7C]" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#EEDDE3] flex items-center justify-between">
            <button
              onClick={() => handleNav('admin')}
              className="text-xs text-[#6F656A] hover:text-[#C94F7C] flex items-center gap-1.5 py-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C94F7C]" />
              <span>Accès Atelier Créatrice</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
