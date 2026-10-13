import React, { useState } from 'react';
import { Order } from '../types';
import { getStoredOrders } from '../services/orderStorage';
import { 
  X, Search, Package, Clock, CheckCircle2, Store, Truck, 
  Ruler, MessageCircle, AlertCircle, Sparkles 
} from 'lucide-react';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim().toLowerCase();
    if (!q) return;

    const allOrders = getStoredOrders();
    const found = allOrders.find(
      (o) =>
        o.orderNumber.toLowerCase() === q ||
        o.customer.phone.replace(/[\s.-]/g, '') === q.replace(/[\s.-]/g, '')
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const statusLabels: Record<string, { label: string; desc: string; color: string }> = {
    to_confirm: {
      label: 'Demande reçue — En cours d’examen',
      desc: 'Célia vérifie vos 10 mesures et va valider la date de confection.',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    pending_info: {
      label: 'En attente d’informations',
      desc: 'Une précision ou photo supplémentaire est requise pour vos ongles.',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    confirmed: {
      label: 'Commande confirmée',
      desc: 'Le prix et le délai sont validés. Les capsules sont programmées à l’atelier.',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    in_production: {
      label: 'En cours de fabrication artisanale',
      desc: 'Vos 10 capsules sont actuellement taillées et peintes à la main par Célia.',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    ready: {
      label: 'Set terminé & vérifié',
      desc: 'Votre kit complet est emballé avec soin, prêt pour la remise.',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    shipped_or_pickup: {
      label: 'Prêt au retrait ou Expédié',
      desc: 'Disponible chez Boukersi (Azazga) ou en cours d’acheminement Yalidine.',
      color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    },
    completed: {
      label: 'Commande remise / Terminée',
      desc: 'Remise effectuée. Profitez bien de vos press-on nails !',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#ecd0c7] shadow-2xl p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#fdfaf8] text-[#2e1a23] hover:bg-[#fceee9] border border-[#f0ded8] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1.5 pb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#fceee9] border border-[#ecd0c7] text-[#a85243] flex items-center justify-center mx-auto shadow-xs">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2e1a23]">
            Suivi de Votre Commande
          </h3>
          <p className="text-xs text-[#785b65]">
            Consultez en direct l'avancement de votre set de press-on nails.
          </p>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Entrez votre n° de commande (ex: CN-2026-001) ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-24 py-3 bg-white text-xs sm:text-sm rounded-2xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243] shadow-xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#2e1a23] text-white rounded-xl text-xs font-semibold hover:bg-[#a85243] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Suivre</span>
            </button>
          </div>
        </form>

        {/* Search Results Display */}
        {hasSearched && searchedOrder && (
          <div className="bg-white rounded-2xl border border-[#ecd0c7] p-5 space-y-4 text-xs animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f0ded8]">
              <div>
                <span className="text-[10px] text-[#785b65] block">COMMANDE</span>
                <span className="font-mono font-bold text-sm text-[#2e1a23]">{searchedOrder.orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#785b65] block">CLIENTE</span>
                <span className="font-bold text-[#2e1a23]">{searchedOrder.customer.fullName}</span>
              </div>
            </div>

            {/* Status pill */}
            <div className={`p-3 rounded-xl border ${statusLabels[searchedOrder.status]?.color || 'bg-gray-100 text-gray-800'}`}>
              <div className="font-bold text-xs">{statusLabels[searchedOrder.status]?.label || searchedOrder.status}</div>
              <div className="text-[11px] mt-0.5 opacity-90">{statusLabels[searchedOrder.status]?.desc}</div>
            </div>

            {/* Set specs */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#785b65]">Modèle : </span>
                <strong>{searchedOrder.item.productName}</strong>
              </div>
              <div>
                <span className="text-[#785b65]">Forme / Longueur : </span>
                <strong>{searchedOrder.item.shape} ({searchedOrder.item.length})</strong>
              </div>
              <div>
                <span className="text-[#785b65]">Échéance estimée : </span>
                <strong>{searchedOrder.confirmedPromiseDate || searchedOrder.estimatedCompletionDate || '3 à 5 jours'}</strong>
              </div>
              <div>
                <span className="text-[#785b65]">Total : </span>
                <strong>{(searchedOrder.confirmedPriceDZD || searchedOrder.estimatedPriceDZD).toLocaleString('fr-FR')} DA</strong>
              </div>
            </div>

            {/* Handover information */}
            <div className="p-3 bg-[#fcf3f0] rounded-xl border border-[#f0ded8] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a85243] block">
                Mode de Réception
              </span>
              {searchedOrder.deliveryMethod === 'boukersi_azazga' ? (
                <div className="flex items-start gap-2">
                  <Store className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Retrait gratuit à Azazga</strong>
                    <p className="text-[11px] text-[#694e57]">Boutique Boukersi (en face de la BADR, centre-ville).</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Livraison Yalidine Express ({searchedOrder.customer.wilayaName})</strong>
                    {searchedOrder.yalidineTrackingNumber ? (
                      <p className="text-[11px] font-mono text-blue-700 font-bold">
                        N° de suivi : {searchedOrder.yalidineTrackingNumber}
                      </p>
                    ) : (
                      <p className="text-[11px] text-[#694e57]">Numéro de suivi transmis dès expédition.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 10 Nails reminder */}
            <div className="p-3 bg-[#fdfaf8] rounded-xl border border-[#ecd0c7] space-y-1 font-mono text-[10px]">
              <span className="text-[10px] font-sans font-bold text-[#785b65] block">Vos 10 mesures enregistrées (mm) :</span>
              <p>G: [{searchedOrder.measurements.leftThumb}-{searchedOrder.measurements.leftIndex}-{searchedOrder.measurements.leftMiddle}-{searchedOrder.measurements.leftRing}-{searchedOrder.measurements.leftPinky}] mm</p>
              <p>D: [{searchedOrder.measurements.rightThumb}-{searchedOrder.measurements.rightIndex}-{searchedOrder.measurements.rightMiddle}-{searchedOrder.measurements.rightRing}-{searchedOrder.measurements.rightPinky}] mm</p>
            </div>

            {/* Direct WhatsApp contact button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const msg = `Bonjour Célia ! ✨ Je vous contacte à propos de ma commande ${searchedOrder.orderNumber} (${searchedOrder.customer.fullName}).`;
                  window.open(`https://wa.me/213550000000?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Poser une question à Célia sur WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Not found state */}
        {hasSearched && !searchedOrder && (
          <div className="bg-[#fcf3f0] rounded-2xl p-6 text-center border border-[#f0ded8] space-y-2 text-xs">
            <AlertCircle className="w-6 h-6 text-[#a85243] mx-auto" />
            <p className="font-bold text-[#2e1a23]">Aucune commande trouvée</p>
            <p className="text-[#785b65]">
              Vérifiez le numéro (ex: <code className="font-mono bg-white px-1 rounded">CN-2026-001</code>) ou votre numéro de téléphone.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
