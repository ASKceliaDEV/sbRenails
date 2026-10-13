import React, { useState } from 'react';
import { PRODUCTS_CATALOG, AVAILABLE_SHAPES, AVAILABLE_LENGTHS } from '../data/catalog';
import { NailShape, NailLength, Product } from '../types';
import { Sparkles, MessageCircle, Instagram, Camera, Heart, Check, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface SurMesureSectionProps {
  onSelectCatalog?: () => void;
}

export const SurMesureSection: React.FC<SurMesureSectionProps> = ({ onSelectCatalog }) => {
  const [mode, setMode] = useState<'catalog_inspired' | 'photo_idea'>('photo_idea');
  
  // Catalog inspired state
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_CATALOG[0]);
  const [customNote, setCustomNote] = useState<string>('');
  const [shape, setShape] = useState<NailShape>('Amande');
  const [length, setLength] = useState<NailLength>('Moyen');

  // Photo / Idea state
  const [ideaDescription, setIdeaDescription] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Mariage / Fête');

  // WhatsApp phone number
  const whatsappNumber = '213550000000';

  // Construct message for catalog inspired
  const getCatalogMessage = () => {
    let msg = `Bonjour Célia ! ✨\nJ'aimerais commander une création sur mesure inspirée du modèle du catalogue « ${selectedProduct.name} ».\n`;
    msg += `• Forme souhaitée : ${shape}\n`;
    msg += `• Longueur : ${length}\n`;
    if (customNote.trim()) {
      msg += `• Mes souhaits / modifications : ${customNote.trim()}\n`;
    }
    msg += `\nPouvons-nous en discuter pour le tarif, mes mesures et le délai ? Merci !`;
    return msg;
  };

  // Construct message for photo/idea
  const getPhotoIdeaMessage = () => {
    let msg = `Bonjour Célia ! ✨\nJ'aimerais commander une création de press-on nails 100% sur mesure inspirée d'une photo Instagram / Pinterest.\n`;
    if (occasion) {
      msg += `• Occasion : ${occasion}\n`;
    }
    msg += `• Forme souhaitée : ${shape}\n`;
    msg += `• Longueur : ${length}\n`;
    if (ideaDescription.trim()) {
      msg += `• Idée / Détails : ${ideaDescription.trim()}\n`;
    }
    msg += `\nJe vous envoie mes photos d'inspiration dans cette discussion. Pouvons-nous échanger pour les détails, le prix et mes mesures ? Merci !`;
    return msg;
  };

  const handleOpenWhatsApp = () => {
    const text = mode === 'catalog_inspired' ? getCatalogMessage() : getPhotoIdeaMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="custom-whatsapp" className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9E5EC] text-xs font-semibold text-[#C94F7C] border border-[#EEDDE3]">
          <Sparkles className="w-3.5 h-3.5 text-[#C94F7C]" />
          <span>Personnalisation du Modèle & Style ♡</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29242A]">
          Création sur mesure inspirée de vos envies ou photos Instagram
        </h1>
        <p className="text-sm sm:text-base text-[#6F656A] max-w-2xl mx-auto leading-relaxed">
          Une tenue spéciale ? Une photo repérée sur Pinterest ou Instagram ? Choisissez votre formule et échangez directement avec Célia sur WhatsApp. Vous discutez ensemble des détails, du prix et du délai, puis votre commande est enregistrée à l'atelier.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl border border-[#EEDDE3] shadow-md overflow-hidden">
        
        {/* Toggle between the 2 modes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#EEDDE3] bg-[#FFF5F8]/60 p-2 gap-2">
          <button
            type="button"
            onClick={() => setMode('photo_idea')}
            className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'photo_idea'
                ? 'bg-white text-[#C94F7C] shadow-sm border border-[#EEDDE3]'
                : 'text-[#6F656A] hover:text-[#29242A] hover:bg-white/50'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Sur mesure (Photo / Idée Instagram)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('catalog_inspired')}
            className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'catalog_inspired'
                ? 'bg-white text-[#C94F7C] shadow-sm border border-[#EEDDE3]'
                : 'text-[#6F656A] hover:text-[#29242A] hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Modèle du catalogue (personnalisé)</span>
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Mode 1: Photo / Idée */}
          {mode === 'photo_idea' && (
            <div className="space-y-6">
              <div className="bg-[#FFF5F8] p-4 sm:p-5 rounded-2xl border border-[#EEDDE3] flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F9E5EC] text-[#C94F7C] flex items-center justify-center shrink-0 mt-0.5">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#29242A]">Vous avez une photo sous la main ?</h4>
                  <p className="text-xs text-[#6F656A] leading-relaxed">
                    Cliquez sur le bouton ci-dessous : WhatsApp s'ouvre avec un message pré-écrit. Vous pourrez directement joindre vos photos d'ongles, de robes ou d'accessoires dans la discussion avec Célia.
                  </p>
                </div>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                    Pour quelle occasion ?
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FFF5F8] border border-[#EEDDE3] rounded-xl text-xs font-medium text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                  >
                    <option value="Mariage / Fiançailles">Mariage / Fiançailles</option>
                    <option value="Fête de famille / Aïd">Fête de famille / Aïd</option>
                    <option value="Shooting / Événement pro">Shooting / Événement</option>
                    <option value="Quotidien chic & travail">Quotidien chic & travail</option>
                    <option value="Autre envie spéciale">Autre envie spéciale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                    Forme préférée :
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value as NailShape)}
                    className="w-full px-3 py-2.5 bg-[#FFF5F8] border border-[#EEDDE3] rounded-xl text-xs font-medium text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                  >
                    {AVAILABLE_SHAPES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} ({s.description})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                  Longueur souhaitée :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVAILABLE_LENGTHS.map((len) => (
                    <button
                      type="button"
                      key={len.name}
                      onClick={() => setLength(len.name)}
                      className={`p-2.5 rounded-xl text-xs text-center border transition-all cursor-pointer ${
                        length === len.name
                          ? 'bg-[#F9E5EC] border-[#C94F7C] text-[#C94F7C] font-bold shadow-xs'
                          : 'bg-[#FFF5F8] border-[#EEDDE3] text-[#29242A] hover:bg-white'
                      }`}
                    >
                      <div className="font-semibold">{len.name}</div>
                      <div className="text-[10px] text-[#6F656A]">{len.mmEstimate}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                  Quelques mots sur vos envies (couleurs, strass, thème...) :
                </label>
                <textarea
                  rows={3}
                  value={ideaDescription}
                  onChange={(e) => setIdeaDescription(e.target.value)}
                  placeholder="Ex : Base nude rosé avec pointes chromées dorées et un petit nœud sur les annulaires..."
                  className="w-full px-3 py-2 bg-[#FFF5F8] border border-[#EEDDE3] rounded-xl text-xs text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                />
              </div>
            </div>
          )}

          {/* Mode 2: Modèle du catalogue personnalisé */}
          {mode === 'catalog_inspired' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#29242A] mb-2">
                  1. Choisissez le modèle du catalogue qui vous inspire :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1 border border-[#EEDDE3] rounded-2xl bg-[#FFF5F8]/40">
                  {PRODUCTS_CATALOG.map((prod) => (
                    <button
                      type="button"
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedProduct.id === prod.id
                          ? 'border-[#C94F7C] bg-white ring-2 ring-[#C94F7C]/30 shadow-xs'
                          : 'border-[#EEDDE3] bg-white hover:bg-[#F9E5EC]/30'
                      }`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-[#FFF5F8]">
                        <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-bold text-[#29242A] line-clamp-1">{prod.name}</div>
                        <div className="text-[10px] font-semibold text-[#C94F7C]">{prod.basePriceDZD} DA</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                    Forme souhaitée :
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value as NailShape)}
                    className="w-full px-3 py-2.5 bg-[#FFF5F8] border border-[#EEDDE3] rounded-xl text-xs font-medium text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                  >
                    {AVAILABLE_SHAPES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                    Longueur souhaitée :
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value as NailLength)}
                    className="w-full px-3 py-2.5 bg-[#FFF5F8] border border-[#EEDDE3] rounded-xl text-xs font-medium text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                  >
                    {AVAILABLE_LENGTHS.map((l) => (
                      <option key={l.name} value={l.name}>
                        {l.name} ({l.mmEstimate})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29242A] mb-1.5">
                  Modifications souhaitées (couleur, strass, finition mate/brillante...) :
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ex : Changer le rose en bordeaux, finition mate avec strass..."
                  className="w-full px-3 py-2 bg-[#FFF5F8] border border-[#EEDDE3] rounded-xl text-xs text-[#29242A] focus:outline-none focus:border-[#C94F7C]"
                />
              </div>
            </div>
          )}

          {/* Aperçu du message WhatsApp généré */}
          <div className="bg-[#FFF5F8] p-4 rounded-2xl border border-[#EEDDE3] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6F656A]">
              <span className="font-semibold text-[#29242A] flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Message prêt à envoyer sur WhatsApp :</span>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Pré-écrit automatiquement
              </span>
            </div>
            <pre className="text-[11px] text-[#29242A] font-sans whitespace-pre-wrap bg-white p-3 rounded-xl border border-[#EEDDE3] italic">
              {mode === 'catalog_inspired' ? getCatalogMessage() : getPhotoIdeaMessage()}
            </pre>
          </div>

          {/* Bouton principal WhatsApp */}
          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full py-4 px-6 rounded-full text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Commander sur WhatsApp →</span>
            </button>

            <p className="text-[11px] text-center text-[#6F656A]">
              Vous discutez directement avec Célia (prix, délai, mesures). Elle enregistrera ensuite votre commande dans son espace atelier.
            </p>
          </div>

          {/* Reassurance atelier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#EEDDE3]">
            <div className="flex items-center gap-2 text-xs text-[#29242A]">
              <Check className="w-4 h-4 text-[#C94F7C] shrink-0" />
              <span>Prix et délai convenus ensemble</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#29242A]">
              <MapPin className="w-4 h-4 text-[#C94F7C] shrink-0" />
              <span>Retrait gratuit à Azazga (Boukersi)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#29242A]">
              <ShieldCheck className="w-4 h-4 text-[#C94F7C] shrink-0" />
              <span>Livraison Yalidine 58 Wilayas</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
