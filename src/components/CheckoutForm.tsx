import React, { useState, useMemo } from 'react';
import { CustomerInfo, DeliveryMethod, OrderItem } from '../types';
import { ALGERIA_WILAYAS } from '../data/algeria';
import { WORKSHOP_INFO } from '../data/catalog';
import { MapPin, Phone, User, Calendar, AlertCircle, Store, Truck, ShieldCheck, Sparkles } from 'lucide-react';

interface CheckoutFormProps {
  customer: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  isUrgent: boolean;
  clientRequestedDate: string;
  clientNotes: string;
  item: OrderItem;
  onCustomerChange: (updated: CustomerInfo) => void;
  onDeliveryMethodChange: (method: DeliveryMethod) => void;
  onUrgentChange: (urgent: boolean) => void;
  onClientRequestedDateChange: (date: string) => void;
  onClientNotesChange: (notes: string) => void;
  onSubmitOrder: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  customer,
  deliveryMethod,
  isUrgent,
  clientRequestedDate,
  clientNotes,
  item,
  onCustomerChange,
  onDeliveryMethodChange,
  onUrgentChange,
  onClientRequestedDateChange,
  onClientNotesChange,
  onSubmitOrder,
}) => {
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Find currently selected wilaya for Yalidine fee calculation
  const currentWilaya = useMemo(() => {
    return ALGERIA_WILAYAS.find((w) => w.code === customer.wilayaCode) || ALGERIA_WILAYAS[14]; // Default 15 Tizi Ouzou
  }, [customer.wilayaCode]);

  // Shipping fee calculation
  const shippingFee = useMemo(() => {
    if (deliveryMethod === 'boukersi_azazga') return 0;
    if (deliveryMethod === 'yalidine_stopdesk') return currentWilaya.yalidineBureauFeeDZD;
    if (deliveryMethod === 'yalidine_home') return currentWilaya.yalidineHomeFeeDZD;
    return 0;
  }, [deliveryMethod, currentWilaya]);

  // Model & options total
  const itemTotal = useMemo(() => {
    let total = item.unitPriceDZD || 2600;
    if (item.finish === 'Poudré Chrome' || item.finish === 'Nacre') total += 200;
    if (item.extraDecors.includes('strass')) total += 300;
    if (item.extraDecors.includes('gold_leaf')) total += 200;
    if (item.extraDecors.includes('nail_art')) total += 400;
    if (item.extraDecors.includes('charms_3d')) total += 300;
    return total;
  }, [item]);

  const urgentFee = isUrgent ? 500 : 0;
  const estimatedGrandTotal = itemTotal + shippingFee + urgentFee;

  // Form submit handler with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!customer.fullName.trim() || customer.fullName.trim().length < 3) {
      errors.push('Veuillez renseigner votre nom complet (au moins 3 caractères).');
    }

    // Algerian phone validation (starts with 05, 06, 07 and 10 digits)
    const cleanedPhone = customer.phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(0)(5|6|7)[0-9]{8}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      errors.push('Veuillez entrer un numéro de téléphone algérien valide (ex: 0550 12 34 56 ou 0661 23 45 67).');
    }

    if (deliveryMethod !== 'boukersi_azazga') {
      if (!customer.commune.trim()) {
        errors.push('Veuillez renseigner votre commune pour la livraison Yalidine.');
      }
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setFormErrors([]);
    onSubmitOrder();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error banner if validation fails */}
      {formErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Veuillez compléter les informations suivantes :</span>
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {formErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 1. Client Contact Info */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-4">
        <h4 className="font-serif text-base font-bold text-[#2e1a23] flex items-center gap-2">
          <User className="w-4 h-4 text-[#a85243]" />
          <span>Vos Coordonnées (Commande sans compte)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
              Nom et Prénom <span className="text-[#a85243]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ex: Nadia Ait Ahmed"
                value={customer.fullName}
                onChange={(e) => onCustomerChange({ ...customer, fullName: e.target.value })}
                className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
              Numéro de Téléphone (WhatsApp) <span className="text-[#a85243]">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="Ex: 0550 12 34 56 ou 0661 23 45 67"
                value={customer.phone}
                onChange={(e) => onCustomerChange({ ...customer, phone: e.target.value })}
                className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
              />
            </div>
            <p className="text-[10px] text-[#785b65] mt-1">
              Utilisé pour vous envoyer le suivi et confirmer votre commande.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Delivery / Handover Method */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-4">
        <h4 className="font-serif text-base font-bold text-[#2e1a23] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#a85243]" />
          <span>Mode de Remise & Destination</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Option Azazga Boukersi */}
          <button
            type="button"
            onClick={() => onDeliveryMethodChange('boukersi_azazga')}
            className={`p-3.5 rounded-2xl text-left border text-xs cursor-pointer transition-all flex flex-col justify-between ${
              deliveryMethod === 'boukersi_azazga'
                ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <Store className="w-4 h-4 text-[#a85243]" />
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  0 DA (Gratuit)
                </span>
              </div>
              <p className="font-bold text-xs">Retrait Azazga</p>
              <p className="text-[10px] text-[#785b65] mt-1">Boutique Boukersi (en face de la BADR)</p>
            </div>
          </button>

          {/* Option Yalidine Stop-desk */}
          <button
            type="button"
            onClick={() => onDeliveryMethodChange('yalidine_stopdesk')}
            className={`p-3.5 rounded-2xl text-left border text-xs cursor-pointer transition-all flex flex-col justify-between ${
              deliveryMethod === 'yalidine_stopdesk'
                ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <Truck className="w-4 h-4 text-[#2e1a23]" />
                <span className="text-[10px] font-bold text-[#a85243]">
                  dès {currentWilaya.yalidineBureauFeeDZD} DA
                </span>
              </div>
              <p className="font-bold text-xs">Yalidine Bureau</p>
              <p className="text-[10px] text-[#785b65] mt-1">À récupérer au centre Yalidine le plus proche</p>
            </div>
          </button>

          {/* Option Yalidine Home */}
          <button
            type="button"
            onClick={() => onDeliveryMethodChange('yalidine_home')}
            className={`p-3.5 rounded-2xl text-left border text-xs cursor-pointer transition-all flex flex-col justify-between ${
              deliveryMethod === 'yalidine_home'
                ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                : 'border-[#ecd0c7] bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fcf3f0]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <Truck className="w-4 h-4 text-[#2e1a23]" />
                <span className="text-[10px] font-bold text-[#a85243]">
                  dès {currentWilaya.yalidineHomeFeeDZD} DA
                </span>
              </div>
              <p className="font-bold text-xs">Yalidine Domicile</p>
              <p className="text-[10px] text-[#785b65] mt-1">Livré directement chez vous</p>
            </div>
          </button>
        </div>

        {/* Address / Wilaya details */}
        {deliveryMethod === 'boukersi_azazga' ? (
          <div className="p-3 bg-[#fceee9]/70 rounded-xl border border-[#ecd0c7] text-xs text-[#4a2835] flex items-center gap-2">
            <Store className="w-4 h-4 text-[#a85243] shrink-0" />
            <span>
              <strong>Point de retrait physique :</strong> Boutique de vêtements Boukersi, Azazga (en face de la banque BADR). Aucun frais de livraison appliqué.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
                Wilaya de livraison <span className="text-[#a85243]">*</span>
              </label>
              <select
                value={customer.wilayaCode}
                onChange={(e) => {
                  const sel = ALGERIA_WILAYAS.find((w) => w.code === e.target.value);
                  if (sel) {
                    onCustomerChange({
                      ...customer,
                      wilayaCode: sel.code,
                      wilayaName: sel.name,
                    });
                  }
                }}
                className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
              >
                {ALGERIA_WILAYAS.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
                Commune <span className="text-[#a85243]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Tizi Ouzou, Bab Ezzouar, Kouba..."
                value={customer.commune}
                onChange={(e) => onCustomerChange({ ...customer, commune: e.target.value })}
                className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
              />
            </div>

            {deliveryMethod === 'yalidine_stopdesk' && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
                  Bureau Yalidine préféré (facultatif)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Bureau Yalidine centre-ville ou le plus proche"
                  value={customer.yalidineBureau || ''}
                  onChange={(e) => onCustomerChange({ ...customer, yalidineBureau: e.target.value })}
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
                />
              </div>
            )}

            {deliveryMethod === 'yalidine_home' && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
                  Adresse exacte pour le livreur
                </label>
                <input
                  type="text"
                  placeholder="Ex: Cité 500 logts, Bâtiment B, près de la mosquée..."
                  value={customer.addressNotes || ''}
                  onChange={(e) => onCustomerChange({ ...customer, addressNotes: e.target.value })}
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Deadlines & Urgency */}
      <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-4">
        <h4 className="font-serif text-base font-bold text-[#2e1a23] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#a85243]" />
          <span>Délais de fabrication & Urgence</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
              Date souhaitée pour avoir votre set (indicatif) :
            </label>
            <input
              type="date"
              value={clientRequestedDate}
              onChange={(e) => onClientRequestedDateChange(e.target.value)}
              className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
            />
            <p className="text-[10px] text-[#785b65] mt-1">
              Délai moyen atelier : 3 à 5 jours selon la charge de travail actuelle.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-[#ecd0c7] bg-[#fcf3f0] cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => onUrgentChange(e.target.checked)}
                className="accent-[#a85243] w-4 h-4 rounded mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-[#2e1a23] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Commande Express Urgente (+500 DA)</span>
                </span>
                <span className="text-[10px] text-[#785b65] leading-tight block mt-0.5">
                  Fabrication prioritaire sous 48h (pour un mariage ou événement imminent).
                </span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
            Notes supplémentaires pour Célia (facultatif) :
          </label>
          <input
            type="text"
            placeholder="Ex: Merci de bien emballer, c'est pour offrir..."
            value={clientNotes}
            onChange={(e) => onClientNotesChange(e.target.value)}
            className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
          />
        </div>
      </div>

      {/* 4. Price Breakdown & Order validation button */}
      <div className="bg-[#2e1a23] text-[#fdfaf8] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <h4 className="font-serif text-lg font-bold text-white flex items-center justify-between">
          <span>Récapitulatif Financier Estimé</span>
          <span className="text-xs font-sans font-medium text-[#e8a598]">Espèces à la réception</span>
        </h4>

        <div className="space-y-2 text-xs border-y border-[#4a2835] py-3">
          <div className="flex justify-between text-[#f7d6cd]">
            <span>Set press-on nails + Kit complet :</span>
            <span className="font-semibold text-white">{itemTotal.toLocaleString('fr-FR')} DA</span>
          </div>

          <div className="flex justify-between text-[#f7d6cd]">
            <span>
              Frais de remise (
              {deliveryMethod === 'boukersi_azazga'
                ? 'Retrait Boukersi Azazga'
                : `Yalidine ${customer.wilayaName || 'Tizi Ouzou'}`}
              ) :
            </span>
            <span className="font-semibold text-white">
              {shippingFee === 0 ? '0 DA (Offert)' : `${shippingFee.toLocaleString('fr-FR')} DA`}
            </span>
          </div>

          {isUrgent && (
            <div className="flex justify-between text-[#e8a598]">
              <span>Supplément fabrication express 48h :</span>
              <span className="font-semibold">+500 DA</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-xs text-[#e8a598] block">Total estimé à régler à la livraison / retrait :</span>
            <span className="text-[10px] text-[#f7d6cd]/70">(Aucun paiement en ligne demandé)</span>
          </div>
          <div className="text-right">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {estimatedGrandTotal.toLocaleString('fr-FR')}
            </span>
            <span className="text-sm font-semibold text-[#e8a598] ml-1">DA</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl text-sm font-bold bg-[#e8a598] text-[#2e1a23] hover:bg-white transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-5 h-5 text-[#2e1a23]" />
          <span>Envoyer ma commande à Célia</span>
        </button>

        <p className="text-[11px] text-center text-[#f7d6cd]/80 leading-relaxed">
          ✨ Après confirmation, vous recevrez votre fiche récapitulative complète avec vos 10 mesures et un bouton direct pour échanger avec Célia sur WhatsApp.
        </p>
      </div>
    </form>
  );
};
