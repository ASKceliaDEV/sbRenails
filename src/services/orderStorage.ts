import { Order, OrderStatus } from '../types';

const STORAGE_KEY = 'nails_by_celia_orders';

// Initial realistic demo orders for the creator to see and test immediately
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1710000001',
    orderNumber: 'CN-2026-001',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'in_production',
    customer: {
      fullName: 'Samia Mansouri',
      phone: '0555 12 34 56',
      wilayaCode: '15',
      wilayaName: '15 - Tizi Ouzou',
      commune: 'Azazga',
      addressNotes: 'Retrait direct boutique Boukersi',
    },
    deliveryMethod: 'boukersi_azazga',
    shippingFeeDZD: 0,
    item: {
      productId: 'baby-boomer-perle',
      productName: 'Baby Boomer Nacre & Perle',
      isCustomCreation: false,
      shape: 'Amande',
      length: 'Moyen',
      finish: 'Brillant',
      extraDecors: ['strass'],
      unitPriceDZD: 2900,
    },
    measurements: {
      presetSize: 'custom',
      leftThumb: 16,
      leftIndex: 12,
      leftMiddle: 13,
      leftRing: 11,
      leftPinky: 9,
      rightThumb: 16,
      rightIndex: 12,
      rightMiddle: 13,
      rightRing: 11,
      rightPinky: 9,
    },
    estimatedPriceDZD: 2900,
    confirmedPriceDZD: 2900,
    isPriceConfirmed: true,
    isUrgent: false,
    estimatedCompletionDate: new Date(Date.now() + 3600000 * 24).toISOString().split('T')[0],
    confirmedPromiseDate: new Date(Date.now() + 3600000 * 24).toISOString().split('T')[0],
    clientNotes: 'Merci de soigner le dégradé, c’est pour mes fiançailles vendredi !',
  },
  {
    id: 'ord_1710000002',
    orderNumber: 'CN-2026-002',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'to_confirm',
    customer: {
      fullName: 'Yasmine Benali',
      phone: '0661 98 76 54',
      wilayaCode: '16',
      wilayaName: '16 - Alger',
      commune: 'Hydra',
      addressNotes: 'Cité des Pins, Bât 3',
      yalidineBureau: 'Bureau Yalidine Hydra / Ben Aknoun',
    },
    deliveryMethod: 'yalidine_stopdesk',
    shippingFeeDZD: 400,
    item: {
      productId: 'glazed-donut-hailey',
      productName: 'Glazed Donut Chrome Opal',
      isCustomCreation: false,
      shape: 'Carré',
      length: 'Court',
      finish: 'Poudré Chrome',
      extraDecors: [],
      unitPriceDZD: 2800,
    },
    measurements: {
      presetSize: 'S',
      leftThumb: 15,
      leftIndex: 12,
      leftMiddle: 13,
      leftRing: 11,
      leftPinky: 9,
      rightThumb: 15,
      rightIndex: 12,
      rightMiddle: 13,
      rightRing: 11,
      rightPinky: 9,
    },
    estimatedPriceDZD: 3200,
    isPriceConfirmed: false,
    isUrgent: true,
    clientRequestedDate: new Date(Date.now() + 3600000 * 48).toISOString().split('T')[0],
    estimatedCompletionDate: new Date(Date.now() + 3600000 * 48).toISOString().split('T')[0],
    clientNotes: 'Commande urgente s’il vous plaît !',
  },
  {
    id: 'ord_1710000003',
    orderNumber: 'CN-2026-003',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    status: 'shipped_or_pickup',
    customer: {
      fullName: 'Lydia Amrouche',
      phone: '0770 45 67 89',
      wilayaCode: '06',
      wilayaName: '06 - Béjaïa',
      commune: 'Akbou',
      addressNotes: 'Bureau Yalidine Akbou centre',
    },
    deliveryMethod: 'yalidine_stopdesk',
    shippingFeeDZD: 400,
    yalidineTrackingNumber: 'YAL-DZ-894102',
    item: {
      productId: 'kabyle-golden-jewel',
      productName: 'Bijou Berbère & Feuille d’Or',
      isCustomCreation: false,
      shape: 'Amande',
      length: 'Long',
      finish: 'Brillant',
      extraDecors: ['gold_leaf'],
      unitPriceDZD: 3800,
    },
    measurements: {
      presetSize: 'M',
      leftThumb: 16,
      leftIndex: 13,
      leftMiddle: 14,
      leftRing: 12,
      leftPinky: 10,
      rightThumb: 16,
      rightIndex: 13,
      rightMiddle: 14,
      rightRing: 12,
      rightPinky: 10,
    },
    estimatedPriceDZD: 4200,
    confirmedPriceDZD: 4200,
    isPriceConfirmed: true,
    isUrgent: false,
    estimatedCompletionDate: new Date(Date.now() - 3600000 * 12).toISOString().split('T')[0],
    confirmedPromiseDate: new Date(Date.now() - 3600000 * 12).toISOString().split('T')[0],
  },
];

export const getStoredOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
};

export const saveOrder = (order: Order): void => {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
};

export const updateOrderStatus = (
  orderId: string,
  newStatus: OrderStatus,
  options?: {
    confirmedPriceDZD?: number;
    confirmedPromiseDate?: string;
    yalidineTrackingNumber?: string;
  }
): Order[] => {
  const current = getStoredOrders();
  const updated = current.map((ord) => {
    if (ord.id === orderId) {
      return {
        ...ord,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        ...(options?.confirmedPriceDZD !== undefined && {
          confirmedPriceDZD: options.confirmedPriceDZD,
          isPriceConfirmed: true,
        }),
        ...(options?.confirmedPromiseDate && {
          confirmedPromiseDate: options.confirmedPromiseDate,
        }),
        ...(options?.yalidineTrackingNumber && {
          yalidineTrackingNumber: options.yalidineTrackingNumber,
        }),
      };
    }
    return ord;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update order status', e);
  }

  return updated;
};

export const updateOrder = (updatedOrder: Order): Order[] => {
  const current = getStoredOrders();
  const updated = current.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update order', e);
  }
  return updated;
};

export const deleteOrder = (orderId: string): Order[] => {
  const current = getStoredOrders();
  const updated = current.filter((ord) => ord.id !== orderId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete order', e);
  }
  return updated;
};

