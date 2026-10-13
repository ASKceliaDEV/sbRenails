import React, { useState } from 'react';
import { Order } from '../types';
import { CheckCircle2, MessageCircle, Copy, Check, Store, Truck, Ruler, Sparkles, X, ArrowLeft } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onBackToHome: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onBackToHome,
}) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  // Generate WhatsApp pre-formatted message
  const generateWhatsAppMessage = (): string => {
    const { orderNumber, customer, item, measurements, deliveryMethod, estimatedPriceDZD } = order;
    
    const deliveryText =
      deliveryMethod === 'boukersi_azazga'
        ? 'Retrait gratuit à Azazga (Boutique Boukersi)'
        : `Livraison Yalidine vers ${customer.wilayaName} (${customer.commune})`;

    const message = `Bonjour Célia ! ✨
Je viens de passer ma commande sur votre boutique en ligne :

📄 N° Commande : ${orderNumber}
👤 Cliente : ${customer.fullName}
📞 Tél : ${customer.phone}

💅 Modèle : ${item.productName}
📐 Forme : ${item.shape} | Longueur : ${item.length}
✨ Finition : ${item.finish}${item.extraDecors.length > 0 ? ` (+ décors: ${item.extraDecors.join(', ')})` : ''}

📏 Mesures des 10 ongles :
- Main Gauche : [${measurements.leftThumb}, ${measurements.leftIndex}, ${measurements.leftMiddle}, ${measurements.leftRing}, ${measurements.leftPinky}] mm
- Main Droite : [${measurements.rightThumb}, ${measurements.rightIndex}, ${measurements.rightMiddle}, ${measurements.rightRing}, ${measurements.rightPinky}] mm

🚚 Remise : ${deliveryText}
💰 Total estimé : ${estimatedPriceDZD.toLocaleString('fr-FR')} DA

Pourriez-vous me confirmer le délai et la prise en charge de mon set ? Merci beaucoup !`;

    return message;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    // Direct link to WhatsApp
    window.open(`https://wa.me/213550000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#ecd0c7] shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#a85243] bg-[#fceee9] px-3 py-1 rounded-full border border-[#f0ded8]">
            Commande transmise avec succès
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e1a23]">
            Merci pour votre commande, {order.customer.fullName.split(' ')[0]} !
          </h2>
          <p className="text-xs text-[#785b65] max-w-md mx-auto">
            Votre demande a bien été enregistrée sous le numéro{' '}
            <strong className="text-[#2e1a23] font-mono text-sm">{order.orderNumber}</strong>.
            Célia va vérifier vos mesures et confirmer le délai définitif.
          </p>
        </div>

        {/* WhatsApp Call to action primary block */}
        <div className="bg-[#fceee9] rounded-2xl p-4 sm:p-5 border border-[#ecd0c7] space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#2e1a23] flex items-center gap-2 justify-center sm:justify-start">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Envoyez votre fiche à Célia sur WhatsApp</span>
              </h3>
              <p className="text-xs text-[#694e57]">
                Un message pré-rempli avec toutes vos mesures et votre référence est prêt en 1 clic !
              </p>
            </div>

            <button
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ouvrir WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Order Details Breakdown Card */}
        <div className="bg-white rounded-2xl border border-[#ecd0c7] p-5 space-y-4 text-xs text-[#2e1a23]">
          
          {/* Header of summary */}
          <div className="flex items-center justify-between pb-3 border-b border-[#f0ded8]">
            <div>
              <span className="text-[10px] text-[#785b65] block">RÉFÉRENCE</span>
              <span className="font-mono font-bold text-sm text-[#2e1a23]">{order.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#785b65] block">STATUT INITIAL</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                À confirmer par l’atelier
              </span>
            </div>
          </div>

          {/* Model & Configuration */}
          <div className="space-y-1.5">
            <span className="font-bold text-[11px] text-[#a85243] uppercase tracking-wider block">
              Modèle & Caractéristiques
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#785b65]">Modèle : </span>
                <strong>{order.item.productName}</strong>
              </div>
              <div>
                <span className="text-[#785b65]">Forme : </span>
                <strong>{order.item.shape}</strong>
              </div>
              <div>
                <span className="text-[#785b65]">Longueur : </span>
                <strong>{order.item.length}</strong>
              </div>
              <div>
                <span className="text-[#785b65]">Finition : </span>
                <strong>{order.item.finish}</strong>
              </div>
            </div>
          </div>

          {/* 10 Measurements table */}
          <div className="space-y-1.5 pt-2 border-t border-[#f0ded8]">
            <span className="font-bold text-[11px] text-[#a85243] uppercase tracking-wider flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5" />
              <span>Mesures enregistrées des 10 ongles (mm)</span>
            </span>
            <div className="bg-[#fcf3f0] p-3 rounded-xl border border-[#f0ded8] space-y-1 font-mono text-[11px]">
              <p>
                <strong className="text-[#2e1a23]">Main Gauche :</strong> [P: {order.measurements.leftThumb}mm, I: {order.measurements.leftIndex}mm, M: {order.measurements.leftMiddle}mm, A: {order.measurements.leftRing}mm, Au: {order.measurements.leftPinky}mm]
              </p>
              <p>
                <strong className="text-[#2e1a23]">Main Droite :</strong> [P: {order.measurements.rightThumb}mm, I: {order.measurements.rightIndex}mm, M: {order.measurements.rightMiddle}mm, A: {order.measurements.rightRing}mm, Au: {order.measurements.rightPinky}mm]
              </p>
            </div>
          </div>

          {/* Delivery & Destination */}
          <div className="space-y-1.5 pt-2 border-t border-[#f0ded8]">
            <span className="font-bold text-[11px] text-[#a85243] uppercase tracking-wider block">
              Mode de Remise & Contact
            </span>
            <div className="space-y-1">
              <p>
                <span className="text-[#785b65]">Contact : </span>
                <strong>{order.customer.fullName}</strong> ({order.customer.phone})
              </p>
              <p>
                <span className="text-[#785b65]">Mode : </span>
                {order.deliveryMethod === 'boukersi_azazga' ? (
                  <strong className="text-[#2e1a23]">Retrait gratuit à Azazga (Boutique Boukersi)</strong>
                ) : (
                  <strong className="text-[#2e1a23]">
                    Livraison Yalidine Express ({order.customer.wilayaName} - {order.customer.commune})
                  </strong>
                )}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-[#f0ded8] flex items-center justify-between font-serif text-lg font-bold">
            <span>Total estimé à régler à la remise :</span>
            <span className="text-xl text-[#a85243]">
              {order.estimatedPriceDZD.toLocaleString('fr-FR')} DA
            </span>
          </div>

        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopySummary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fceee9] border border-[#ecd0c7] cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#a85243]" />}
            <span>{copied ? 'Fiche copiée !' : 'Copier le récapitulatif'}</span>
          </button>

          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#2e1a23] text-white hover:bg-[#4a2835] cursor-pointer"
          >
            <span>Retour à l'accueil</span>
          </button>
        </div>

      </div>
    </div>
  );
};
