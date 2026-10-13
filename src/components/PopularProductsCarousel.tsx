import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import { CatalogCard } from './CatalogCard';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

interface PopularProductsCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
  onViewAllCatalog: () => void;
}

export const PopularProductsCarousel: React.FC<PopularProductsCarouselProps> = ({
  products,
  onSelectProduct,
  onDirectOrder,
  onViewAllCatalog,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable arrow buttons
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Scroll by approximately one card width or container width
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#EEDDE3]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Title and Functional Arrow buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C94F7C] tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nouveautés & Tendances</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#29242A]">
              Coups de Cœur de l'Atelier ♡
            </h2>
            <p className="text-xs sm:text-sm text-[#6F656A] max-w-md">
              Des sets prêts à poser, calibrés selon vos mesures et réutilisables.
            </p>
          </div>

          {/* Right Controls: Arrow buttons and "Voir tout" */}
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <button
              onClick={onViewAllCatalog}
              className="text-xs font-semibold text-[#C94F7C] hover:text-[#b03d68] hover:underline cursor-pointer transition-colors"
            >
              Voir toute la collection →
            </button>

            {/* Left and Right navigation arrows (Requis par la consigne) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'border-[#EEDDE3] bg-white text-[#29242A] hover:bg-[#F9E5EC] hover:text-[#C94F7C] shadow-xs'
                    : 'border-[#EEDDE3]/40 bg-[#FFF5F8]/50 text-[#6F656A]/40 cursor-not-allowed'
                }`}
                aria-label="Faire défiler vers la gauche"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'border-[#EEDDE3] bg-white text-[#29242A] hover:bg-[#F9E5EC] hover:text-[#C94F7C] shadow-xs'
                    : 'border-[#EEDDE3]/40 bg-[#FFF5F8]/50 text-[#6F656A]/40 cursor-not-allowed'
                }`}
                aria-label="Faire défiler vers la droite"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Row: 4 cards on desktop, 2 on tablet, 1-2 on mobile */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[260px] sm:w-[280px] lg:w-[calc(25%-18px)] snap-start flex"
            >
              <div className="w-full flex">
                <CatalogCard
                  product={product}
                  onSelect={onSelectProduct}
                  onDirectOrder={onDirectOrder}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
