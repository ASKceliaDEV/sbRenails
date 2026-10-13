/**
 * Service de génération et gestion des notifications clients (WhatsApp, SMS & Suivi)
 */

import { Order } from '../types';
import { WORKSHOP_INFO } from '../data/catalog';

export type NotificationType =
  | 'order_received'         // Accusé de réception initial
  | 'order_confirmed'        // Confirmation du prix et délai promis
  | 'ready_pickup_boukersi'  // Prêt pour retrait à Azazga
  | 'shipped_yalidine'       // Expédié avec n° de suivi Yalidine
  | 'missing_info'           // Demande de précision ou photo des mains
  | 'order_completed';       // Remerciement après remise

export interface NotificationTemplate {
  type: NotificationType;
  title: string;
  description: string;
  badge: string;
  buildMessage: (order: Order) => string;
}

export const NOTIFICATION_TEMPLATES: Record<NotificationType, NotificationTemplate> = {
  // 1. Accusé de réception
  order_received: {
    type: 'order_received',
    title: 'Accusé de réception de commande',
    description: 'Envoyé dès la réception de la demande pour rassurer la cliente.',
    badge: 'Réception',
    buildMessage: (order: Order) => {
      const isBoukersi = order.deliveryMethod === 'boukersi_azazga';
      const deliveryText = isBoukersi
        ? 'Retrait gratuit à Azazga (Boutique Boukersi)'
        : `Livraison Yalidine vers ${order.customer.wilayaName} (${order.customer.commune})`;

      return `Bonjour ${order.customer.fullName} ! ✨
Nous avons bien reçu votre commande pour le set « ${order.item.productName} » (Réf: ${order.orderNumber}).

📋 Récapitulatif :
- Forme : ${order.item.shape} | Longueur : ${order.item.length} | Finition : ${order.item.finish}
- Mesures 10 ongles : G:[${order.measurements.leftThumb}-${order.measurements.leftIndex}-${order.measurements.leftMiddle}-${order.measurements.leftRing}-${order.measurements.leftPinky}] | D:[${order.measurements.rightThumb}-${order.measurements.rightIndex}-${order.measurements.rightMiddle}-${order.measurements.rightRing}-${order.measurements.rightPinky}] mm
- Mode de remise : ${deliveryText}
- Montant estimé : ${(order.confirmedPriceDZD || order.estimatedPriceDZD).toLocaleString('fr-FR')} DA

Célia examine vos mesures et reviendra très vite vers vous pour valider le délai de fabrication. Merci beaucoup !`;
    },
  },

  // 2. Confirmation et Date Promise
  order_confirmed: {
    type: 'order_confirmed',
    title: 'Validation & Date promise de remise',
    description: 'Confirme à la cliente que le prix et le délai de confection sont validés.',
    badge: 'Confirmation',
    buildMessage: (order: Order) => {
      const dateText = order.confirmedPromiseDate || order.estimatedCompletionDate || 'sous 3 à 5 jours';
      return `Bonjour ${order.customer.fullName} ! 💅
Votre commande « ${order.item.productName} » (${order.orderNumber}) est officiellement validée à l'atelier !

📅 Date promise de mise à disposition : ${dateText}
💰 Prix total convenu : ${(order.confirmedPriceDZD || order.estimatedPriceDZD).toLocaleString('fr-FR')} DA (règlement en espèces à la réception).

Vos capsules sont en cours de calibrage selon vos mesures. Vous recevrez une alerte dès que votre set sera prêt ! ✨`;
    },
  },

  // 3. Prêt pour retrait chez Boukersi (Azazga)
  ready_pickup_boukersi: {
    type: 'ready_pickup_boukersi',
    title: 'Set disponible chez Boukersi (Azazga)',
    description: 'Notifie la cliente que son colis est déposé et prêt au magasin Boukersi.',
    badge: 'Retrait Azazga',
    buildMessage: (order: Order) => {
      const totalToPay = (order.confirmedPriceDZD || order.estimatedPriceDZD).toLocaleString('fr-FR');
      return `Bonjour ${order.customer.fullName} ! 🎁
Votre set de press-on nails faits main (${order.orderNumber}) est PRÊT !

📍 Lieu de retrait : Boutique de vêtements Boukersi
📌 Adresse : En face de la banque BADR, Azazga centre
💰 Montant à régler au comptoir : ${totalToPay} DA (Frais de retrait : 0 DA)

Il vous suffit de donner votre nom ou le numéro de commande au comptoir. Belle pose et régalez-vous ! ✨`;
    },
  },

  // 4. Expédié avec suivi Yalidine
  shipped_yalidine: {
    type: 'shipped_yalidine',
    title: 'Colis expédié via Yalidine Express',
    description: 'Transmet le numéro de suivi officiel et le montant à régler au livreur.',
    badge: 'Yalidine',
    buildMessage: (order: Order) => {
      const tracking = order.yalidineTrackingNumber || 'YAL-DZ-EN-COURS';
      const totalToPay = (order.confirmedPriceDZD || order.estimatedPriceDZD).toLocaleString('fr-FR');
      const isHome = order.deliveryMethod === 'yalidine_home';

      return `Bonjour ${order.customer.fullName} ! 📦
Votre set de press-on nails « ${order.item.productName} » (${order.orderNumber}) vient d’être confié à Yalidine Express !

🚚 Numéro de suivi : ${tracking}
🔗 Lien de suivi en direct : https://yalidine.com/tracking?tracking=${tracking}
📍 Destination : ${order.customer.wilayaName} (${order.customer.commune}) - ${isHome ? 'À domicile' : 'Bureau Stop-Desk'}
💰 Montant à régler en espèces au livreur : ${totalToPay} DA

Le livreur ou le bureau Yalidine vous contactera dès l'arrivée du colis (délai habituel 24h à 48h). Merci pour votre confiance !`;
    },
  },

  // 5. Demande de précision ou photo des ongles
  missing_info: {
    type: 'missing_info',
    title: 'Précision sur les mesures ou photos',
    description: 'À envoyer si une mesure semble inhabituelle ou si un doute subsiste.',
    badge: 'Vérification',
    buildMessage: (order: Order) => {
      return `Bonjour ${order.customer.fullName} ! 🔍
Célia à l’atelier pour votre commande (${order.orderNumber}).

Pour être 100% certaine que vos capsules soient parfaites et confortables, pourriez-vous m'envoyer une photo rapide de vos mains à plat avec une pièce ou une règle à côté ? 
Cela me permettra de vérifier la courbure de vos ongles avant de poser le gel. Merci beaucoup !`;
    },
  },

  // 6. Remerciement après remise
  order_completed: {
    type: 'order_completed',
    title: 'Remerciement & Conseils d’entretien',
    description: 'Envoyé après la livraison avec les astuces pour réutiliser les capsules 3 à 5 fois.',
    badge: 'Entretien',
    buildMessage: (order: Order) => {
      return `Bonjour ${order.customer.fullName} ! 💖
J'espère que vous adorez votre nouveau set de press-on nails !

Conseils pour vos ongles :
✨ Conservez bien votre kit et vos boîtes.
✨ Avec les gel pads fournis, vous pouvez retirer et reposer vos ongles 3 à 5 fois sans aucun dommage.
✨ N'hésitez pas à m'envoyer une jolie photo sur Instagram en taguant l'atelier !

À très bientôt pour une prochaine création !`;
    },
  },
};

/**
 * Ouvre WhatsApp avec un message pré-rempli pour la cliente
 */
export function openWhatsAppNotification(order: Order, type: NotificationType): void {
  const template = NOTIFICATION_TEMPLATES[type];
  if (!template) return;

  const message = template.buildMessage(order);
  const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
  const internationalPhone = cleanPhone.startsWith('0') ? `213${cleanPhone.slice(1)}` : `213${cleanPhone}`;

  window.open(`https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`, '_blank');
}
