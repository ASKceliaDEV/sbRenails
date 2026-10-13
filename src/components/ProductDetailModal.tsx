import React, { useState } from 'react';
import { Product, NailShape, NailLength } from '../types';
import { AVAILABLE_SHAPES, AVAILABLE_LENGTHS, WORKSHOP_INFO } from '../data/catalog';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, MapPin, PackageCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onProceedToOrder: (product: Product, selectedShape: NailShape, selectedLength: NailLength) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedToOrder,
}) => {
  if (!product) return null;

  const [selectedShape, setSelectedShape] = useState<NailShape>(product.availableShapes[0] || 'Amande');
  const [selectedLength, setSelectedLength] = useState<NailLength>(product.availableLengths[0] || 'Moyen');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#ecd0c7] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#fdfaf8]/90 text-[#2e1a23] hover:bg-[#fceee9] border border-[#f0ded8] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-7">
          
          {/* Left Column: Image & Kit items */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#fceee9] border border-[#ecd0c7] shadow-inner">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#2e1a23]/85 backdrop-blur-md text-[#f7d6cd] text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Inclusions kit box */}
            <div className="bg-[#fcf3f0] rounded-2xl p-4 border border-[#f0ded8] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2e1a23]">
                <PackageCheck className="w-4 h-4 text-[#a85243]" />
                <span>Kit d’application complet inclus :</span>
              </div>
              <ul className="text-[11px] text-[#694e57] space-y-1.5 list-disc pl-4">
                {product.includedInKit.map((item, idx) => (
                  <li key={idx} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Details, Shape/Length Selection & CTA */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category & Title */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#a85243]">
                  {product.categoryLabel}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e1a23] mt-0.5">
                  {product.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pb-3 border-b border-[#f0ded8]">
                <span className="font-serif text-3xl font-bold text-[#2e1a23]">
                  {product.basePriceDZD.toLocaleString('fr-FR')}
                </span>
                <span className="text-sm font-semibold text-[#a85243]">DA</span>
                <span className="text-[11px] text-[#785b65] ml-1">(Kit complet & 10 capsules compris)</span>
              </div>

              {/* Description & Inspiration note */}
              <div className="space-y-2 text-xs sm:text-sm text-[#4a2835] leading-relaxed">
                <p>{product.description}</p>
                <div className="p-3 bg-[#fceee9]/70 rounded-xl border border-[#ecd0c7] text-xs text-[#785b65] italic flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Note de l’artiste :</strong> {product.inspirationNote}</span>
                </div>
              </div>

              {/* Shape selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2e1a23] flex items-center justify-between">
                  <span>1. Choisissez votre forme préférée :</span>
                  <span className="text-[11px] font-normal text-[#a85243]">{selectedShape}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AVAILABLE_SHAPES.filter(s => product.availableShapes.includes(s.name)).map((shape) => (
                    <button
                      key={shape.name}
                      onClick={() => setSelectedShape(shape.name)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        selectedShape === shape.name
                          ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                          : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{shape.icon} {shape.name}</span>
                        {selectedShape === shape.name && <Check className="w-3.5 h-3.5 text-[#a85243]" />}
                      </div>
                      <span className="text-[9px] text-[#785b65] font-normal mt-1 leading-tight line-clamp-1">
                        {shape.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2e1a23] flex items-center justify-between">
                  <span>2. Choisissez la longueur :</span>
                  <span className="text-[11px] font-normal text-[#a85243]">{selectedLength}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_LENGTHS.filter(l => product.availableLengths.includes(l.name)).map((len) => (
                    <button
                      key={len.name}
                      onClick={() => setSelectedLength(len.name)}
                      className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                        selectedLength === len.name
                          ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                          : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
                      }`}
                    >
                      <div>{len.name}</div>
                      <div className="text-[9px] text-[#785b65] font-normal">{len.mmEstimate}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery reminder */}
              <div className="text-[11px] text-[#785b65] bg-[#fdfaf8] p-2.5 rounded-xl border border-[#ecd0c7] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#a85243] shrink-0" />
                <span>
                  Retrait à <strong>{WORKSHOP_INFO.freePickupCommune}</strong> (0 DA) ou expédition <strong>Yalidine Express</strong> selon votre wilaya.
                </span>
              </div>

            </div>

            {/* Action CTA buttons */}
            <div className="pt-4 border-t border-[#EEDDE3] space-y-2.5">
              <button
                onClick={() => onProceedToOrder(product, selectedShape, selectedLength)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#C94F7C] text-white hover:bg-[#b03d68] transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>Commander ce set en ligne</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => {
                  const msg = `Bonjour Célia ! ✨
J'aimerais commander le modèle « ${product.name} » avec :
• Forme : ${selectedShape}
• Longueur : ${selectedLength}
• Prix catalogue : ${product.basePriceDZD.toLocaleString('fr-FR')} DA

Pouvons-nous en discuter pour les mesures et le délai de confection ? Merci !`;
                  window.open(`https://wa.me/213550000000?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-[#FFF5F8] text-emerald-700 hover:bg-emerald-50 border border-emerald-300 transition-colors cursor-pointer"
              >
                <span>💬 Ou commander directement sur WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-[#6F656A]">
                Paiement à la livraison • Retrait gratuit à Azazga ou envoi Yalidine 58 Wilayas
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
