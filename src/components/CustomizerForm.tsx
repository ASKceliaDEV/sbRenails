import React from 'react';
import { OrderItem, NailShape, NailLength } from '../types';
import { AVAILABLE_SHAPES, AVAILABLE_LENGTHS, PRODUCTS_CATALOG } from '../data/catalog';
import { Sparkles, Palette, Layers, Check, MessageCircle, ArrowRight, Heart } from 'lucide-react';

interface CustomizerFormProps {
  item: OrderItem;
  onChange: (updated: OrderItem) => void;
  onWhatsAppOrder?: () => void;
}

export const CustomizerForm: React.FC<CustomizerFormProps> = ({ item, onChange, onWhatsAppOrder }) => {
  const extraDecorOptions = [
    { id: 'strass', label: 'Strass en cristal Swarovski', price: 300 },
    { id: 'gold_leaf', label: 'Inclusions Feuille d’or', price: 200 },
    { id: 'nail_art', label: 'Nail Art dessin main levée', price: 400 },
    { id: 'charms_3d', label: 'Charms / Bijoux 3D perlés', price: 300 },
  ];

  const finishOptions: { id: OrderItem['finish']; label: string; price: number }[] = [
    { id: 'Brillant', label: 'Brillant miroir classique', price: 0 },
    { id: 'Mat', label: 'Mat velours poudré', price: 0 },
    { id: 'Poudré Chrome', label: 'Effet Glazed / Poudre Chrome', price: 200 },
    { id: 'Nacre', label: 'Reflets nacrés opalescents', price: 200 },
  ];

  // Helper to open WhatsApp for a custom order directly
  const handleOpenWhatsAppForCustom = () => {
    const message = `Bonjour Célia ! ✨
J'aimerais commander une création personnalisée de press-on nails :

💅 Modèle souhaité : ${item.productName}
📐 Forme : ${item.shape}
📏 Longueur : ${item.length}
✨ Finition : ${item.finish}${item.extraDecors.length > 0 ? ` (+ décors: ${item.extraDecors.join(', ')})` : ''}
${item.customDescription ? `📝 Détails / Idée : ${item.customDescription}\n` : ''}
Je vous envoie mes photos d'inspiration pour convenir du prix, du délai et de mes mesures. Merci !`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/213550000000?text=${encoded}`, '_blank');

    if (onWhatsAppOrder) {
      onWhatsAppOrder();
    }
  };

  const handleDecorToggle = (decorId: string) => {
    const isPresent = item.extraDecors.includes(decorId);
    const newDecors = isPresent
      ? item.extraDecors.filter((d) => d !== decorId)
      : [...item.extraDecors, decorId];

    onChange({
      ...item,
      extraDecors: newDecors,
    });
  };

  const handleFinishChange = (finish: OrderItem['finish']) => {
    onChange({
      ...item,
      finish,
    });
  };

  return (
    <div className="space-y-6">
      {/* Set Type / Model selection header */}
      <div className="bg-[#fceee9]/60 rounded-2xl p-4 sm:p-5 border border-[#ecd0c7] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#2e1a23] text-white flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5 text-[#e8a598]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2e1a23]">
                Personnalisation du Modèle & Style
              </h3>
              <p className="text-xs text-[#785b65]">
                {item.isCustomCreation
                  ? 'Création sur mesure inspirée de vos envies ou photos Instagram'
                  : `Modèle sélectionné : ${item.productName}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onChange({
                  ...item,
                  isCustomCreation: false,
                  productName: PRODUCTS_CATALOG[0].name,
                  unitPriceDZD: PRODUCTS_CATALOG[0].basePriceDZD,
                });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                !item.isCustomCreation
                  ? 'bg-[#2e1a23] text-white'
                  : 'bg-[#fdfaf8] text-[#4a2835] border border-[#ecd0c7]'
              }`}
            >
              Modèle du catalogue
            </button>
            <button
              type="button"
              onClick={() => {
                onChange({
                  ...item,
                  isCustomCreation: true,
                  productName: 'Création personnalisée sur mesure',
                  unitPriceDZD: 2800,
                });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                item.isCustomCreation
                  ? 'bg-[#a85243] text-white'
                  : 'bg-[#fdfaf8] text-[#4a2835] border border-[#ecd0c7]'
              }`}
            >
              Sur mesure (Photo/Idée)
            </button>
          </div>
        </div>

        {/* Catalog product dropdown if not custom creation */}
        {!item.isCustomCreation ? (
          <div className="pt-2 border-t border-[#f0ded8]">
            <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
              Choisir un modèle du catalogue :
            </label>
            <select
              value={item.productName}
              onChange={(e) => {
                const found = PRODUCTS_CATALOG.find((p) => p.name === e.target.value);
                if (found) {
                  onChange({
                    ...item,
                    productName: found.name,
                    productId: found.id,
                    unitPriceDZD: found.basePriceDZD,
                  });
                }
              }}
              className="w-full bg-[#fdfaf8] border border-[#ecd0c7] text-xs font-medium text-[#2e1a23] rounded-xl p-2.5 focus:outline-none focus:border-[#a85243]"
            >
              {PRODUCTS_CATALOG.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.basePriceDZD.toLocaleString('fr-FR')} DA) - {p.categoryLabel}
                </option>
              ))}
            </select>
          </div>
        ) : (
          /* Custom Order Highlight Banner with WhatsApp Action */
          <div className="pt-2 border-t border-[#f0ded8] bg-[#fdfaf8] p-4 rounded-xl border border-[#ecd0c7] space-y-2.5">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#2e1a23]">
                  Vous avez une photo d'inspiration ou une demande spéciale ?
                </p>
                <p className="text-[11px] text-[#694e57] leading-relaxed">
                  Discutez directement avec Célia sur WhatsApp. Vous pourrez lui envoyer vos photos, convenir ensemble du design, du prix et du délai de fabrication. Célia enregistrera ensuite votre commande dans son atelier.
                </p>
              </div>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={handleOpenWhatsAppForCustom}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander sur WhatsApp avec ce modèle</span>
              </button>

              <span className="text-[10px] text-[#785b65]">
                ou continuez les étapes ci-dessous pour saisir vos 10 mesures en millimètres.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Shapes Selection */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3">
        <label className="text-xs font-bold text-[#2e1a23] flex items-center justify-between">
          <span>1. Forme des capsules souhaitée :</span>
          <span className="text-[11px] font-semibold text-[#a85243]">{item.shape}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {AVAILABLE_SHAPES.map((shape) => (
            <button
              key={shape.name}
              type="button"
              onClick={() => onChange({ ...item, shape: shape.name })}
              className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                item.shape === shape.name
                  ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                  : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{shape.icon} {shape.name}</span>
                {item.shape === shape.name && <Check className="w-3.5 h-3.5 text-[#a85243]" />}
              </div>
              <span className="text-[9px] text-[#785b65] font-normal mt-1 leading-tight line-clamp-1">
                {shape.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lengths Selection */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3">
        <label className="text-xs font-bold text-[#2e1a23] flex items-center justify-between">
          <span>2. Longueur désirée :</span>
          <span className="text-[11px] font-semibold text-[#a85243]">{item.length}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {AVAILABLE_LENGTHS.map((len) => (
            <button
              key={len.name}
              type="button"
              onClick={() => onChange({ ...item, length: len.name })}
              className={`p-3 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                item.length === len.name
                  ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                  : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
              }`}
            >
              <div className="font-semibold">{len.name}</div>
              <div className="text-[10px] text-[#785b65] mt-0.5">{len.mmEstimate}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Finish selection */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3">
        <label className="text-xs font-bold text-[#2e1a23]">
          3. Finition du top coat :
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {finishOptions.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFinishChange(f.id)}
              className={`p-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                item.finish === f.id
                  ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                  : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
              }`}
            >
              <div>{f.label}</div>
              {f.price > 0 && <span className="text-[9px] text-[#a85243]">+{f.price} DA</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Extra Decors Checkboxes */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#2e1a23]">
            4. Décors & ajouts optionnels (facultatif) :
          </label>
          <span className="text-[10px] text-[#785b65]">Cumulables</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {extraDecorOptions.map((decor) => {
            const checked = item.extraDecors.includes(decor.id);
            return (
              <label
                key={decor.id}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  checked
                    ? 'border-[#a85243] bg-[#fceee9] text-[#2e1a23] font-semibold'
                    : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleDecorToggle(decor.id)}
                    className="accent-[#a85243] w-4 h-4 rounded"
                  />
                  <span>{decor.label}</span>
                </div>
                <span className="text-[11px] text-[#a85243] font-bold">+{decor.price} DA</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Custom notes or inspiration field */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3">
        <label className="block text-xs font-bold text-[#2e1a23]">
          {item.isCustomCreation
            ? 'Description de votre idée / inspiration (couleurs, motif, événement) :'
            : 'Remarques ou légères modifications souhaitées sur ce modèle :'}
        </label>
        <textarea
          rows={3}
          value={item.customDescription || ''}
          onChange={(e) => onChange({ ...item, customDescription: e.target.value })}
          placeholder="Ex: Je souhaite une nuance rose un peu plus claire pour mon mariage le 20 mai, avec un strass discret sur l'annulaire..."
          className="w-full p-3 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243] resize-none"
        />
        
        {/* Direct WhatsApp button below the description */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-[#fcf3f0] rounded-xl border border-[#f0ded8]">
          <span className="text-[11px] text-[#694e57]">
            Vous avez une photo de l'inspiration à montrer ?
          </span>
          <button
            type="button"
            onClick={handleOpenWhatsAppForCustom}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Commander sur WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
