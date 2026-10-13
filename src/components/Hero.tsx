import React from 'react';
import { ArrowRight, Truck, Banknote, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenHowItWorks }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FFFFFF] to-[#FFF5F8]/40 border-b border-[#EEDDE3]/60 py-10 sm:py-14 lg:py-18">
      {/* Cœurs décoratifs d'ambiance discrets */}
      <div className="absolute top-6 right-10 text-[#F9E5EC] text-4xl select-none pointer-events-none -rotate-12 opacity-60">
        ♡
      </div>
      <div className="absolute bottom-8 left-6 text-[#F9E5EC] text-5xl select-none pointer-events-none rotate-12 opacity-40">
        ♡
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Colonne Gauche : Textes promotionnels, titres et boutons */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Petit texte décoratif en police manuscrite */}
            <div className="inline-flex items-center gap-2">
              <span className="font-script text-2xl sm:text-3xl text-[#C94F7C] font-semibold tracking-wide">
                Press-on nails ♡
              </span>
            </div>

            {/* Titre principal sur plusieurs lignes */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#29242A] leading-[1.12]">
              TES ONGLES,<br />
              <span className="text-[#C94F7C]">TA PASSION ♡</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#6F656A] max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
              Des press-on nails prêts à porter, réutilisables et réalisés avec amour.
            </p>

            {/* Deux boutons */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Bouton principal rose */}
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#C94F7C] text-white hover:bg-[#b03d68] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Découvrir la collection</span>
                <span className="text-sm">→</span>
              </button>

              {/* Bouton secondaire discret */}
              <button
                onClick={onOpenHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium bg-white text-[#29242A] border border-[#EEDDE3] hover:bg-[#F9E5EC] hover:border-[#C94F7C]/30 transition-colors cursor-pointer"
              >
                <span>Comment ça marche ?</span>
              </button>
            </div>

            {/* Sous les boutons : 2 informations avec petites icônes */}
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#29242A] border-t border-[#EEDDE3]/60 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F9E5EC] text-[#C94F7C] flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#29242A]">Livraison disponible partout en Algérie</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F9E5EC] text-[#C94F7C] flex items-center justify-center shrink-0">
                  <Banknote className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#29242A]">Paiement à la livraison</span>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Grande photographie réaliste et esthétique */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Cadre arrière décoratif très doux */}
              <div className="absolute inset-0 bg-[#F9E5EC]/80 rounded-3xl transform rotate-2 scale-102 -z-10 shadow-sm" />

              {/* Conteneur principal de la photo */}
              <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#EEDDE3] shadow-xl overflow-hidden relative group">
                <div className="relative aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden bg-[#FFF5F8]">
                  <img
                    src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85"
                    alt="Press-on nails artisanaux haut de gamme bordeaux, rose poudré et nude SB Renails"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />

                  {/* Badge délicat en superposition */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#C94F7C] border border-[#EEDDE3] shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C94F7C]" />
                    <span>Fait main avec amour</span>
                  </div>

                  {/* Petit cœur discret en bas à droite */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center shadow-xs text-[#C94F7C] border border-[#EEDDE3]">
                    <Heart className="w-4 h-4 fill-[#C94F7C]" />
                  </div>
                </div>

                {/* Micro note esthétique sous la photo */}
                <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#6F656A]">
                  <span className="font-serif italic font-medium text-[#29242A]">Collection Capsule Haute Précision</span>
                  <span className="text-[11px] text-[#C94F7C] font-semibold bg-[#F9E5EC] px-2 py-0.5 rounded-full">
                    Réutilisables 3 à 5 fois
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
