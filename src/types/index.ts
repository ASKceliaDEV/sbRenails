/**
 * Types TypeScript pour la boutique de Press-on Nails
 */

export type NailShape = 'Amande' | 'Cercueil' | 'Carré' | 'Stiletto' | 'Ovale';

export type NailLength = 'Court' | 'Moyen' | 'Long' | 'Extra Long';

export type CatalogCategory = 
  | 'all'
  | 'nude'
  | 'french'
  | 'glamour'
  | 'chrome'
  | 'artisan';

export interface Product {
  id: string;
  name: string;
  category: CatalogCategory;
  categoryLabel: string;
  basePriceDZD: number;
  description: string;
  inspirationNote: string;
  imageUrl: string;
  badge?: string;
  availableShapes: NailShape[];
  availableLengths: NailLength[];
  includedInKit: string[];
  features: string[];
  tags: string[];
}

export interface WorkshopInfo {
  location: string;
  pickupPoint: string;
  pickupAddress: string;
  deliveryService: string;
  freePickupCommune: string;
  typicalProductionDays: number;
  instagramUrl?: string;
  instagramHandle?: string;
  whatsappNumber?: string;
  whatsappLink?: string;
}

export type PresetSize = 'XS' | 'S' | 'M' | 'L' | 'custom';

export interface NailMeasurements {
  presetSize: PresetSize;
  // Main gauche (en mm)
  leftThumb: number;
  leftIndex: number;
  leftMiddle: number;
  leftRing: number;
  leftPinky: number;
  // Main droite (en mm)
  rightThumb: number;
  rightIndex: number;
  rightMiddle: number;
  rightRing: number;
  rightPinky: number;
  notes?: string;
}

export type DeliveryMethod = 'boukersi_azazga' | 'yalidine_stopdesk' | 'yalidine_home';

export type OrderStatus = 
  | 'to_confirm'        // À confirmer (délai et prix)
  | 'pending_info'      // En attente d'infos / mesures
  | 'confirmed'         // Confirmée (prix et délai validés)
  | 'in_production'     // En préparation atelier
  | 'ready'             // Prête (set terminé)
  | 'shipped_or_pickup' // Prête au retrait Boukersi OU Colis Yalidine créé
  | 'completed'         // Terminée / Livrée
  | 'cancelled';        // Annulée

export interface OrderItem {
  productId?: string;
  productName: string;
  isCustomCreation: boolean;
  shape: NailShape;
  length: NailLength;
  finish: 'Brillant' | 'Mat' | 'Poudré Chrome' | 'Nacre';
  extraDecors: string[];
  customDescription?: string;
  referenceImageUrl?: string;
  unitPriceDZD: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  wilayaCode: string;
  wilayaName: string;
  commune: string;
  addressNotes?: string;
  yalidineBureau?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // Ex: CN-2026-001
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  
  // Client & Livraison
  customer: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  shippingFeeDZD: number;
  yalidineTrackingNumber?: string;
  
  // Produit & Mesures
  item: OrderItem;
  measurements: NailMeasurements;
  
  // Financier & Délais
  estimatedPriceDZD: number;
  confirmedPriceDZD?: number;
  isPriceConfirmed: boolean;
  isUrgent: boolean;
  clientRequestedDate?: string;
  estimatedCompletionDate: string;
  confirmedPromiseDate?: string;
  
  // Notes et communication
  clientNotes?: string;
  creatorInternalNotes?: string;
}
