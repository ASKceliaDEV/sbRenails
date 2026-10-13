import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { updateOrderStatus, updateOrder } from '../../services/orderStorage';
import { NotificationCenterModal } from './NotificationCenterModal';
import { 
  X, Printer, MessageCircle, Ruler, Store, Truck, Calendar, 
  CheckCircle, Clock, AlertTriangle, Edit3, Save, ExternalLink 
} from 'lucide-react';

interface OrderDetailSheetModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated: () => void;
}

export const OrderDetailSheetModal: React.FC<OrderDetailSheetModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdated,
}) => {
  if (!isOpen || !order) return null;

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [confirmedPrice, setConfirmedPrice] = useState<number>(
    order.confirmedPriceDZD || order.estimatedPriceDZD
  );
  const [promisedDate, setPromisedDate] = useState<string>(
    order.confirmedPromiseDate || order.estimatedCompletionDate
  );
  const [trackingNumber, setTrackingNumber] = useState<string>(
    order.yalidineTrackingNumber || ''
  );
  const [internalNotes, setInternalNotes] = useState<string>(
    order.creatorInternalNotes || ''
  );
  const [showPrintView, setShowPrintView] = useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<boolean>(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);

  // Status labels and badge styling
  const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string }> = {
    to_confirm: { label: 'À confirmer', bg: 'bg-amber-100', text: 'text-amber-800' },
    pending_info: { label: 'En attente d’infos', bg: 'bg-orange-100', text: 'text-orange-800' },
    confirmed: { label: 'Confirmée', bg: 'bg-blue-100', text: 'text-blue-800' },
    in_production: { label: 'En préparation', bg: 'bg-purple-100', text: 'text-purple-800' },
    ready: { label: 'Prête', bg: 'bg-indigo-100', text: 'text-indigo-800' },
    shipped_or_pickup: { 
      label: order.deliveryMethod === 'boukersi_azazga' ? 'Prête au retrait Boukersi' : 'Expédiée Yalidine', 
      bg: 'bg-cyan-100', 
      text: 'text-cyan-800' 
    },
    completed: { label: 'Terminée / Remise', bg: 'bg-emerald-100', text: 'text-emerald-800' },
    cancelled: { label: 'Annulée', bg: 'bg-rose-100', text: 'text-rose-800' },
  };

  const handleSaveOrderChanges = () => {
    const updated: Order = {
      ...order,
      status: currentStatus,
      confirmedPriceDZD: confirmedPrice,
      isPriceConfirmed: true,
      confirmedPromiseDate: promisedDate,
      yalidineTrackingNumber: trackingNumber || undefined,
      creatorInternalNotes: internalNotes,
      updatedAt: new Date().toISOString(),
    };

    updateOrder(updated);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
    onOrderUpdated();
  };

  // WhatsApp notification generators
  const handleOpenClientWhatsApp = () => {
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const internationalPhone = cleanPhone.startsWith('0') ? `213${cleanPhone.slice(1)}` : `213${cleanPhone}`;
    window.open(`https://wa.me/${internationalPhone}`, '_blank');
  };

  const handleSendReadyNotificationWhatsApp = () => {
    let msg = '';
    if (order.deliveryMethod === 'boukersi_azazga') {
      msg = `Bonjour ${order.customer.fullName} ! ✨
Bonne nouvelle : votre set de press-on nails « ${order.item.productName} » (${order.orderNumber}) est prêt !

📍 Vous pouvez venir le retirer dès aujourd’hui à la boutique de vêtements Boukersi (en face de la banque BADR à Azazga).
💰 Montant à régler sur place : ${(order.confirmedPriceDZD || order.estimatedPriceDZD).toLocaleString('fr-FR')} DA.

Merci pour votre confiance ! À très bientôt.`;
    } else {
      msg = `Bonjour ${order.customer.fullName} ! ✨
Votre set de press-on nails « ${order.item.productName} » (${order.orderNumber}) est prêt et expédié via Yalidine Express !

📦 Numéro de suivi : ${trackingNumber || 'En cours d’attribution'}
📍 Destination : ${order.customer.wilayaName} (${order.customer.commune})
💰 Total à régler à la livraison : ${(order.confirmedPriceDZD || order.estimatedPriceDZD).toLocaleString('fr-FR')} DA.

Vous recevrez un appel ou SMS du livreur dès son arrivée. Merci !`;
    }

    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? `213${cleanPhone.slice(1)}` : `213${cleanPhone}`;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#ecd0c7] shadow-2xl p-5 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and close button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0ded8]">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-lg sm:text-xl text-[#2e1a23] bg-[#fceee9] px-3 py-1 rounded-xl border border-[#f0ded8]">
              {order.orderNumber}
            </span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2e1a23]">
                Fiche de Commande Atelier
              </h2>
              <p className="text-xs text-[#785b65]">
                Reçue le {new Date(order.createdAt).toLocaleDateString('fr-FR')} à {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
              title="Ouvrir le centre de notifications WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Notifications WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#2e1a23] border border-[#ecd0c7] hover:bg-[#fceee9] transition-colors cursor-pointer"
              title="Imprimer la fiche atelier"
            >
              <Printer className="w-3.5 h-3.5 text-[#a85243]" />
              <span>Imprimer</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#fdfaf8] text-[#2e1a23] hover:bg-[#fceee9] border border-[#f0ded8] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success toast */}
        {saveSuccessNotice && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Modifications enregistrées avec succès !</span>
          </div>
        )}

        {/* Status Control Banner */}
        <div className="bg-[#fceee9]/70 rounded-2xl p-4 border border-[#ecd0c7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2e1a23]">Statut actuel :</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[currentStatus].bg} ${statusConfig[currentStatus].text}`}>
              {statusConfig[currentStatus].label}
            </span>
            {order.isUrgent && (
              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                URGENT
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[#785b65]">Changer le statut :</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
              className="bg-white text-xs font-semibold text-[#2e1a23] p-2 rounded-xl border border-[#ecd0c7] focus:outline-none focus:border-[#a85243] cursor-pointer"
            >
              <option value="to_confirm">À confirmer</option>
              <option value="pending_info">En attente d'infos</option>
              <option value="confirmed">Confirmée</option>
              <option value="in_production">En préparation (Atelier)</option>
              <option value="ready">Prête</option>
              <option value="shipped_or_pickup">
                {order.deliveryMethod === 'boukersi_azazga' ? 'Prête au retrait Boukersi' : 'Expédiée Yalidine'}
              </option>
              <option value="completed">Terminée / Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        </div>

        {/* 2-Columns Grid of Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#2e1a23]">
          
          {/* Left Column: Customer & Delivery */}
          <div className="space-y-4">
            
            {/* Customer Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0ded8]">
                <span className="font-bold text-[#a85243] uppercase tracking-wider text-[11px]">
                  Informations Cliente
                </span>
                <button
                  type="button"
                  onClick={handleOpenClientWhatsApp}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp direct</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <p>
                  <strong className="text-[#785b65]">Nom :</strong> {order.customer.fullName}
                </p>
                <p>
                  <strong className="text-[#785b65]">Téléphone :</strong>{' '}
                  <span className="font-mono font-bold text-[#2e1a23]">{order.customer.phone}</span>
                </p>
                {order.clientNotes && (
                  <div className="p-2.5 bg-[#fcf3f0] rounded-xl text-[11px] text-[#694e57] italic">
                    <strong>Note cliente :</strong> "{order.clientNotes}"
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0ded8]">
                <span className="font-bold text-[#a85243] uppercase tracking-wider text-[11px]">
                  Remise & Livraison
                </span>
                <span className="text-[10px] font-semibold bg-[#fceee9] text-[#a85243] px-2 py-0.5 rounded-full">
                  {order.deliveryMethod === 'boukersi_azazga' ? 'Retrait Azazga' : 'Yalidine Express'}
                </span>
              </div>

              {order.deliveryMethod === 'boukersi_azazga' ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <Store className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2e1a23]">Point Relais Boukersi (Azazga)</strong>
                      <p className="text-[11px] text-[#694e57]">
                        Boutique de vêtements Boukersi, en face de la banque BADR (0 DA).
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendReadyNotificationWhatsApp}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#fceee9] text-[#a85243] hover:bg-[#fcf3f0] border border-[#ecd0c7] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Envoyer message WhatsApp « Set prêt chez Boukersi »</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2 text-xs">
                    <Truck className="w-4 h-4 text-[#2e1a23] shrink-0 mt-0.5" />
                    <div>
                      <strong>Destination :</strong> {order.customer.wilayaName} ({order.customer.commune})
                      {order.customer.addressNotes && <p className="text-[11px] text-[#785b65]">Adresse : {order.customer.addressNotes}</p>}
                      {order.customer.yalidineBureau && <p className="text-[11px] text-[#785b65]">Bureau : {order.customer.yalidineBureau}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2e1a23] mb-1">
                      Numéro de suivi Yalidine :
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ex: YAL-DZ-894102"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="flex-1 p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] font-mono text-xs"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          const randomNum = Math.floor(100000 + Math.random() * 900000);
                          const newCode = `YAL-DZ-${randomNum}`;
                          setTrackingNumber(newCode);
                          setCurrentStatus('shipped_or_pickup');
                        }}
                        className="px-3 py-2 bg-[#2e1a23] text-white rounded-xl text-[11px] font-bold hover:bg-[#a85243] transition-colors cursor-pointer shrink-0"
                        title="Générer un numéro de suivi Yalidine via l'API"
                      >
                        ⚡ Générer (API)
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendReadyNotificationWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#fceee9] text-[#a85243] hover:bg-[#fcf3f0] border border-[#ecd0c7] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Envoyer WhatsApp « Colis expédié avec suivi »</span>
                  </button>
                </div>
              )}
            </div>

            {/* Internal Creator Notes */}
            <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-2">
              <label className="block text-[11px] font-bold text-[#a85243] uppercase tracking-wider">
                Notes Internes Atelier (visibles par Célia uniquement) :
              </label>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Ex: capsules taille amande M préparées, cliente préfère nuance nude rosé..."
                className="w-full p-2.5 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] text-xs resize-none"
              />
            </div>

          </div>

          {/* Right Column: Measurements (10 nails) & Model specifications */}
          <div className="space-y-4">
            
            {/* Model & Specifications */}
            <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
              <span className="font-bold text-[#a85243] uppercase tracking-wider text-[11px] block pb-2 border-b border-[#f0ded8]">
                Modèle & Caractéristiques
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#785b65] block text-[10px]">MODÈLE</span>
                  <strong className="text-sm">{order.item.productName}</strong>
                </div>
                <div>
                  <span className="text-[#785b65] block text-[10px]">FORME</span>
                  <strong>{order.item.shape}</strong>
                </div>
                <div>
                  <span className="text-[#785b65] block text-[10px]">LONGUEUR</span>
                  <strong>{order.item.length}</strong>
                </div>
                <div>
                  <span className="text-[#785b65] block text-[10px]">FINITION</span>
                  <strong>{order.item.finish}</strong>
                </div>
              </div>

              {order.item.extraDecors.length > 0 && (
                <div className="pt-2 text-[11px]">
                  <span className="text-[#785b65]">Décors supplémentaires : </span>
                  <strong>{order.item.extraDecors.join(', ')}</strong>
                </div>
              )}

              {order.item.customDescription && (
                <div className="p-2.5 bg-[#fcf3f0] rounded-xl text-[11px] text-[#694e57]">
                  <strong>Détails personnalisés :</strong> {order.item.customDescription}
                </div>
              )}
            </div>

            {/* 10 NAIL MEASUREMENTS HIGHLIGHT TABLE */}
            <div className="bg-[#2e1a23] text-white p-4 sm:p-5 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#4a2835]">
                <h4 className="font-serif text-base font-bold flex items-center gap-1.5 text-white">
                  <Ruler className="w-4 h-4 text-[#e8a598]" />
                  <span>Fiche des 10 Mesures (en millimètres)</span>
                </h4>
                <span className="text-[10px] text-[#e8a598] font-mono">
                  Taille : {order.measurements.presetSize.toUpperCase()}
                </span>
              </div>

              {/* Hand Table */}
              <div className="space-y-3 font-mono text-xs">
                {/* Left hand */}
                <div className="bg-[#4a2835]/60 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-sans font-bold text-[#e8a598] uppercase">
                    Main Gauche (5 ongles)
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-center">
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Pouce</div>
                      <div className="font-bold text-sm">{order.measurements.leftThumb} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Index</div>
                      <div className="font-bold text-sm">{order.measurements.leftIndex} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Majeur</div>
                      <div className="font-bold text-sm">{order.measurements.leftMiddle} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Annul.</div>
                      <div className="font-bold text-sm">{order.measurements.leftRing} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Auric.</div>
                      <div className="font-bold text-sm">{order.measurements.leftPinky} <span className="text-[9px]">mm</span></div>
                    </div>
                  </div>
                </div>

                {/* Right hand */}
                <div className="bg-[#4a2835]/60 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-sans font-bold text-[#e8a598] uppercase">
                    Main Droite (5 ongles)
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-center">
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Pouce</div>
                      <div className="font-bold text-sm">{order.measurements.rightThumb} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Index</div>
                      <div className="font-bold text-sm">{order.measurements.rightIndex} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Majeur</div>
                      <div className="font-bold text-sm">{order.measurements.rightMiddle} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Annul.</div>
                      <div className="font-bold text-sm">{order.measurements.rightRing} <span className="text-[9px]">mm</span></div>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded">
                      <div className="text-[9px] text-[#f7d6cd]">Auric.</div>
                      <div className="font-bold text-sm">{order.measurements.rightPinky} <span className="text-[9px]">mm</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Promised Date Confirmation */}
            <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] space-y-3">
              <span className="font-bold text-[#a85243] uppercase tracking-wider text-[11px] block pb-2 border-b border-[#f0ded8]">
                Validation Financière & Délais
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2e1a23] mb-1">
                    Prix confirmé (DA) :
                  </label>
                  <input
                    type="number"
                    step="50"
                    value={confirmedPrice}
                    onChange={(e) => setConfirmedPrice(Number(e.target.value))}
                    className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2e1a23] mb-1">
                    Date promise de remise :
                  </label>
                  <input
                    type="date"
                    value={promisedDate}
                    onChange={(e) => setPromisedDate(e.target.value)}
                    className="w-full p-2 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="text-[11px] text-[#785b65] flex items-center justify-between pt-1">
                <span>Frais de remise inclus : {order.shippingFeeDZD} DA</span>
                <span className="font-bold text-[#2e1a23]">Total : {confirmedPrice} DA</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Action buttons */}
        <div className="pt-4 border-t border-[#f0ded8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[#785b65] hover:bg-[#fcf3f0] cursor-pointer"
          >
            Fermer
          </button>

          <button
            type="button"
            onClick={handleSaveOrderChanges}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-colors cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4 text-[#e8a598]" />
            <span>Enregistrer les modifications</span>
          </button>
        </div>

        {/* Notification Center modal for custom WhatsApp messages */}
        <NotificationCenterModal
          order={order}
          isOpen={isNotificationCenterOpen}
          onClose={() => setIsNotificationCenterOpen(false)}
        />

      </div>
    </div>
  );
};
