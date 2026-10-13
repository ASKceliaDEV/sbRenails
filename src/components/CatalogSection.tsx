import React, { useState, useMemo } from 'react';
import { Product, CatalogCategory, NailShape } from '../types';
import { PRODUCTS_CATALOG, AVAILABLE_SHAPES } from '../data/catalog';
import { CatalogCard } from './CatalogCard';
import { Sparkles, Search, Palette, Filter, HeartHandshake } from 'lucide-react';

interface CatalogSectionProps {
  onSelectProduct: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
  onCustomOrderClick: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectProduct,
  onDirectOrder,
  onCustomOrderClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShape, setSelectedShape] = useState<string>('all');

  const categories: { id: CatalogCategory; label: string }[] = [
    { id: 'all', label: 'Toute la collection' },
    { id: 'french', label: 'French & Dégradé' },
    { id: 'nude', label: 'Nude & Chaleur' },
    { id: 'glamour', label: 'Glamour & Strass' },
    { id: 'chrome', label: 'Chrome & Opal' },
    { id: 'artisan', label: 'Inspirations Kabyles' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchShape =
        selectedShape === 'all' || item.availableShapes.includes(selectedShape as NailShape);

      return matchCategory && matchSearch && matchShape;
    });
  }, [selectedCategory, searchQuery, selectedShape]);

  return (
    <section id="catalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fceee9] text-xs font-semibold text-[#a85243] border border-[#f0ded8]">
          <Palette className="w-3.5 h-3.5" />
          <span>Capsules en gel réutilisables & faites main</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2e1a23]">
          Le Catalogue des Créations
        </h2>
        <p className="text-sm sm:text-base text-[#694e57]">
          Chaque set est confectionné individuellement à la main à l’atelier selon vos 10 mesures d’ongles.
          Tous les prix incluent le <strong>kit complet de pose et d’entretien</strong>.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="space-y-4 mb-8">
        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2e1a23] text-[#fdfaf8] shadow-sm'
                  : 'bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fceee9] border border-[#ecd0c7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filters (Search & Shape select) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fcf3f0] p-3 rounded-2xl border border-[#f0ded8]">
          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#785b65] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un modèle, couleur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#fdfaf8] text-xs sm:text-sm rounded-xl border border-[#ecd0c7] focus:outline-none focus:border-[#a85243] text-[#2e1a23]"
            />
          </div>

          {/* Shape selector filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="w-4 h-4 text-[#785b65] hidden sm:block" />
            <span className="text-xs text-[#785b65] hidden sm:inline">Filtrer par forme :</span>
            <select
              value={selectedShape}
              onChange={(e) => setSelectedShape(e.target.value)}
              aria-label="Filtrer par forme d'ongle"
              className="bg-[#fdfaf8] text-xs font-medium text-[#2e1a23] py-2 px-3 rounded-xl border border-[#ecd0c7] focus:outline-none focus:border-[#a85243] cursor-pointer"
            >
              <option value="all">Toutes les formes</option>
              {AVAILABLE_SHAPES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.description})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <CatalogCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onDirectOrder={onDirectOrder}
            />
          ))}

          {/* Custom Order Box Inside Grid */}
          <div className="bg-gradient-to-br from-[#fceee9] via-[#fdfaf8] to-[#f7d6cd]/40 rounded-2xl border-2 border-dashed border-[#dfb9ae] p-6 sm:p-8 flex flex-col justify-between text-center items-center shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#fdfaf8] border border-[#ecd0c7] flex items-center justify-center mx-auto shadow-xs">
                <Sparkles className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2e1a23]">
                Envie d’une création 100% sur mesure ?
              </h3>
              <p className="text-xs text-[#694e57] leading-relaxed max-w-xs mx-auto">
                Vous avez vu une photo sur Pinterest ou Instagram ? Choisissez vos couleurs, votre forme et vos décors : nous réalisons votre set personnalisé.
              </p>
            </div>

            <div className="pt-4 w-full space-y-2">
              <button
                onClick={() => {
                  const msg = `Bonjour Célia ! ✨
J'aimerais commander une création de press-on nails personnalisée sur mesure à partir d'une photo d'inspiration.
Pouvons-nous en discuter pour les détails, le prix et mes mesures ? Merci !`;
                  window.open(`https://wa.me/213550000000?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-sm"
              >
                <span>💬 Commander sur WhatsApp</span>
              </button>
              <p className="text-[10px] text-[#785b65]">Discussion directe avec Célia sur vos photos & tenue</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-[#fcf3f0] rounded-3xl border border-[#f0ded8] space-y-3">
          <p className="text-base font-serif font-bold text-[#2e1a23]">Aucun modèle ne correspond à votre recherche</p>
          <p className="text-xs text-[#785b65]">Essayez d'autres mots-clés ou réinitialisez les filtres.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedShape('all');
            }}
            className="px-4 py-2 bg-[#2e1a23] text-white text-xs rounded-full cursor-pointer hover:bg-[#4a2835]"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
};
