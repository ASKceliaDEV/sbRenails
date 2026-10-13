import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Eye, ArrowRight } from 'lucide-react';

interface CatalogCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({
  product,
  onSelect,
  onDirectOrder,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [favoriteLocal, setFavoriteLocal] = useState(isFavorite);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteLocal(!favoriteLocal);
    if (onToggleFavorite) onToggleFavorite(product.id);
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-[#EEDDE3] hover:border-[#C94F7C]/40 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* 1. Image occupant la partie supérieure */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#FFF5F8]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge optionnel (Bestseller, etc.) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#29242A]/85 backdrop-blur-md text-[#FFF5F8] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Icône cœur interactive dans l'angle supérieur */}
        <button
          type="button"
          onClick={handleHeartClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#6F656A] hover:text-[#C94F7C] transition-colors shadow-xs z-10 cursor-pointer"
          aria-label="Ajouter aux favoris"
          title="Ajouter aux favoris"
        >
          <Heart 
            className={`w-4 h-4 transition-transform active:scale-125 ${
              favoriteLocal ? 'fill-[#C94F7C] text-[#C94F7C]' : ''
            }`} 
          />
        </button>

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-[#29242A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#29242A] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#C94F7C]" />
            <span>Voir les détails</span>
          </span>
        </div>
      </div>

      {/* 2. Zone de contenu : Nom et prix bien hiérarchisés */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          {/* Catégorie discrète */}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C94F7C]">
            {product.categoryLabel}
          </span>

          {/* Nom du produit */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#29242A] group-hover:text-[#C94F7C] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Prix bien hiérarchisé */}
          <div className="flex items-baseline gap-1 pt-0.5">
            <span className="text-base sm:text-lg font-bold text-[#29242A] font-serif">
              {product.basePriceDZD.toLocaleString('fr-FR')}
            </span>
            <span className="text-xs font-bold text-[#C94F7C]">DA</span>
          </div>

          {/* Formes disponibles en pastilles discrètes */}
          <div className="pt-1 flex flex-wrap gap-1 text-[10px] text-[#6F656A]">
            {product.availableShapes.slice(0, 3).map((shape) => (
              <span key={shape} className="bg-[#FFF5F8] px-1.5 py-0.5 rounded border border-[#EEDDE3]">
                {shape}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Bouton rose pâle avec texte rose foncé, virant au hover */}
        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDirectOrder(product);
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#F9E5EC] text-[#C94F7C] hover:bg-[#C94F7C] hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Commander ce set</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
