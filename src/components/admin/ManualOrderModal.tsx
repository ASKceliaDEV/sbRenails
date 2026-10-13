import React, { useState } from 'react';
import { Order, OrderItem, NailMeasurements, CustomerInfo, DeliveryMethod, NailShape, NailLength } from '../../types';
import { PRODUCTS_CATALOG, AVAILABLE_SHAPES, AVAILABLE_LENGTHS } from '../../data/catalog';
import { ALGERIA_WILAYAS, PRESET_SIZES_VALUES } from '../../data/algeria';
import { NailMeasurementForm } from '../NailMeasurementForm';
import { X, Plus, Sparkles, Check, User, Phone, MapPin, Calendar, Ruler } from 'lucide-react';

interface ManualOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSaved: (order: Order) => void;
}

export const ManualOrderModal: React.FC<ManualOrderModalProps> = ({
  isOpen,
  onClose,
  onOrderSaved,
}) => {
  if (!isOpen) return null;

  // Customer state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('boukersi_azazga');
  const [wilayaCode, setWilayaCode] = useState('15');
  const [commune, setCommune] = useState('Azazga');
  const [addressNotes, setAddressNotes] = useState('');

  // Item state
  const [isCustom, setIsCustom] = useState(true);
  const [productName, setProductName] = useState('Création sur mesure (Discussion WhatsApp)');
  const [shape, setShape] = useState<NailShape>('Amande');
  const [length, setLength] = useState<NailLength>('Moyen');
  const [finish, setFinish] = useState<OrderItem['finish']>('Brillant');
  const [customDescription, setCustomDescription] = useState('');

  // Financial & Schedule
  const [priceDZD, setPriceDZD] = useState<number>(3000);
  const [isUrgent, setIsUrgent] = useState(false);
  const [promisedDate, setPromisedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');

  // Measurements
  const defaultSize = PRESET_SIZES_VALUES['S'];
  const [measurements, setMeasurements] = useState<NailMeasurements>({
    presetSize: 'S',
    leftThumb: defaultSize.thumb,
    leftIndex: defaultSize.index,
    leftMiddle: defaultSize.middle,
    leftRing: defaultSize.ring,
    leftPinky: defaultSize.pinky,
    rightThumb: defaultSize.thumb,
    rightIndex: defaultSize.index,
    rightMiddle: defaultSize.middle,
    rightRing: defaultSize.ring,
    rightPinky: defaultSize.pinky,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const orderNumber = `CN-2026-${randomSuffix}`;

    const wilayaObj = ALGERIA_WILAYAS.find((w) => w.code === wilayaCode) || ALGERIA_WILAYAS[14];
    const shippingFee =
      deliveryMethod === 'boukersi_azazga'
        ? 0
        : deliveryMethod === 'yalidine_stopdesk'
        ? wilayaObj.yalidineBureauFeeDZD
        : wilayaObj.yalidineHomeFeeDZD;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'confirmed', // Already confirmed since negotiated via WhatsApp
      customer: {
        fullName: fullName || 'Cliente WhatsApp',
        phone: phone || '0550 00 00 00',
        wilayaCode,
        wilayaName: wilayaObj.name,
        commune,
        addressNotes,
      },
      deliveryMethod,
      shippingFeeDZD: shippingFee,
      item: {
        productName: isCustom ? (customDescription || 'Création sur mesure sur photo') : productName,
        isCustomCreation: isCustom,
        shape,
        length,
        finish,
        extraDecors: [],
        customDescription,
        unitPriceDZD: priceDZD,
      },
      measurements,
      estimatedPriceDZD: priceDZD + shippingFee,
      confirmedPriceDZD: priceDZD + shippingFee,
      isPriceConfirmed: true,
      isUrgent,
      estimatedCompletionDate: promisedDate,
      confirmedPromiseDate: promisedDate,
      clientNotes: notes,
      creatorInternalNotes: `Commande enregistrée après discussion WhatsApp. Convenue le ${new Date().toLocaleDateString('fr-FR')}.`,
    };

    onOrderSaved(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#ecd0c7] shadow-2xl p-5 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#fdfaf8] text-[#2e1a23] hover:bg-[#fceee9] border border-[#f0ded8] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="border-b border-[#f0ded8] pb-3 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2e1a23] text-white flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#e8a598]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2e1a23]">
                Enregistrer une Commande (WhatsApp / Direct)
              </h2>
              <p className="text-xs text-[#785b65]">
                Saisissez les détails de la commande convenue avec votre cliente sur WhatsApp ou à l'atelier.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-[#2e1a23]">
          {/* Section 1: Coordonnées cliente */}
          <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#2e1a23] flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#a85243]" />
              <span>Coordonnées de la cliente</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Karima Saadi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] focus:outline-none focus:border-[#a85243]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Numéro Téléphone (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 0550 12 34 56"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] focus:outline-none focus:border-[#a85243]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Mode de Remise */}
          <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#2e1a23] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#a85243]" />
              <span>Mode de Remise / Livraison</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryMethod('boukersi_azazga')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  deliveryMethod === 'boukersi_azazga'
                    ? 'border-[#2e1a23] bg-[#fceee9] font-bold'
                    : 'border-[#ecd0c7] bg-[#fdfaf8]'
                }`}
              >
                <div>Retrait Boukersi Azazga</div>
                <div className="text-[10px] text-emerald-700 font-semibold">0 DA (Gratuit)</div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('yalidine_stopdesk')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  deliveryMethod === 'yalidine_stopdesk'
                    ? 'border-[#2e1a23] bg-[#fceee9] font-bold'
                    : 'border-[#ecd0c7] bg-[#fdfaf8]'
                }`}
              >
                <div>Yalidine Stop-Desk (Bureau)</div>
                <div className="text-[10px] text-[#785b65]">Récupération au bureau</div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('yalidine_home')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  deliveryMethod === 'yalidine_home'
                    ? 'border-[#2e1a23] bg-[#fceee9] font-bold'
                    : 'border-[#ecd0c7] bg-[#fdfaf8]'
                }`}
              >
                <div>Yalidine Domicile</div>
                <div className="text-[10px] text-[#785b65]">Livré à domicile</div>
              </button>
            </div>

            {deliveryMethod !== 'boukersi_azazga' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-semibold mb-1">Wilaya</label>
                  <select
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(e.target.value)}
                    className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                  >
                    {ALGERIA_WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>{w.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Commune</label>
                  <input
                    type="text"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Modèle & Style */}
          <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-[#2e1a23]">
                Modèle & Caractéristiques convenus
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    isCustom ? 'bg-[#2e1a23] text-white' : 'bg-[#fdfaf8] border border-[#ecd0c7]'
                  }`}
                >
                  Sur-mesure (Photo)
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustom(false)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    !isCustom ? 'bg-[#2e1a23] text-white' : 'bg-[#fdfaf8] border border-[#ecd0c7]'
                  }`}
                >
                  Catalogue
                </button>
              </div>
            </div>

            {isCustom ? (
              <div>
                <label className="block font-semibold mb-1">Description du modèle sur mesure convenu</label>
                <input
                  type="text"
                  placeholder="Ex: French manucure rose gold + strass sur les annulaires"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                />
              </div>
            ) : (
              <div>
                <label className="block font-semibold mb-1">Modèle du catalogue</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                >
                  {PRODUCTS_CATALOG.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1">Forme</label>
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value as NailShape)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                >
                  {AVAILABLE_SHAPES.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Longueur</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as NailLength)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                >
                  {AVAILABLE_LENGTHS.map((l) => (
                    <option key={l.name} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Finition</label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value as OrderItem['finish'])}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                >
                  <option value="Brillant">Brillant</option>
                  <option value="Mat">Mat</option>
                  <option value="Poudré Chrome">Poudré Chrome</option>
                  <option value="Nacre">Nacre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Mesures des 10 ongles */}
          <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#2e1a23] flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#a85243]" />
              <span>Mesures des 10 ongles notées lors de l'échange (en mm)</span>
            </h4>
            <NailMeasurementForm
              measurements={measurements}
              onChange={setMeasurements}
            />
          </div>

          {/* Section 5: Prix & Échéances */}
          <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#2e1a23] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#a85243]" />
              <span>Prix convenu & Date promise</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block font-semibold mb-1">Prix du set convenu (DA) *</label>
                <input
                  type="number"
                  required
                  step="50"
                  value={priceDZD}
                  onChange={(e) => setPriceDZD(Number(e.target.value))}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Date promise de remise *</label>
                <input
                  type="date"
                  required
                  value={promisedDate}
                  onChange={(e) => setPromisedDate(e.target.value)}
                  className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
                />
              </div>

              <div className="flex items-center pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="accent-[#a85243] w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-xs text-[#a85243]">Commande urgente</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Remarques ou détails atelier</label>
              <input
                type="text"
                placeholder="Ex: Capsules Apres amande moyenne, bien sceller les strass..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#f0ded8] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#785b65] hover:bg-[#fcf3f0] cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-colors cursor-pointer shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Enregistrer dans le tableau de bord</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
