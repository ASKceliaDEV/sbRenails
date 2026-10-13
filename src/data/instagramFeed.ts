import { WORKSHOP_INFO } from './catalog';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  isClientWorn: boolean;
  category: 'client' | 'wedding' | 'workshop' | 'trend';
  clientInfo?: {
    name: string;
    city: string;
    wilaya: string;
    reviewQuote?: string;
    rating?: number;
    occasion?: string;
  };
  matchedProductId?: string;
  matchedProductName?: string;
  instagramPostUrl: string;
  tags: string[];
}

export const INITIAL_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80',
    caption: '🤍 Zoom sur le modèle « Baby Boomer Nacre & Perle » porté par la ravissante Sonia pour ses fiançailles à Alger. Tenue 3 semaines avec notre colle professionnelle, dépose sans aucun dommage ! Merci pour votre confiance ma belle ✨ #sbrenails #pressonailsalgerie #fiancaillesalgerie #onglesalger',
    likes: 412,
    commentsCount: 38,
    timestamp: 'Il y a 2 jours',
    isClientWorn: true,
    category: 'wedding',
    clientInfo: {
      name: 'Sonia M.',
      city: 'Hydra',
      wilaya: 'Alger (16)',
      reviewQuote: 'Ils ont tenu toute la soirée et mes cousines ont cru que c’était une pose gel en salon ! Juste parfait.',
      rating: 5,
      occasion: 'Fiançailles',
    },
    matchedProductId: 'baby-boomer-perle',
    matchedProductName: 'Baby Boomer Nacre & Perle',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#BabyBoomer', '#Fiançailles', '#Alger', '#ClientReview'],
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
    caption: '✨ Détails or 24k et symboles berbères peints au pinceau 000. Reçu par notre cliente Kenza à Tizi Ouzou pour son trousseau de mariée. Fière de mettre en valeur notre artisanat kabyle traditionnel dans des press-on nails haute couture 👑 #sbrenails #tiziouzou #azazga #berbere #trousseaumariee',
    likes: 689,
    commentsCount: 64,
    timestamp: 'Il y a 4 jours',
    isClientWorn: true,
    category: 'wedding',
    clientInfo: {
      name: 'Kenza B.',
      city: 'Tizi Ouzou',
      wilaya: 'Tizi Ouzou (15)',
      reviewQuote: 'Retiré directement au point relais de Boukersi à Azazga. Le détail des dorures est incroyable !',
      rating: 5,
      occasion: 'Mariage traditionnel',
    },
    matchedProductId: 'kabyle-golden-jewel',
    matchedProductName: 'Bijou Berbère & Feuille d’Or',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#KabyleArt', '#Azazga', '#MariageAlgérien', '#Artisanat'],
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80',
    caption: 'Glazed Donut Chrome sous le soleil d’Oran ☀️✨ Notre cliente Amira a opté pour la forme Amande en taille S posée avec nos Gel Pads pour pouvoir les retirer après le weekend. Réutilisables à l’infini ! 💅 #sbrenails #glazeddonutnails #pressonoran #haileybiebernails',
    likes: 524,
    commentsCount: 42,
    timestamp: 'Il y a 6 jours',
    isClientWorn: true,
    category: 'client',
    clientInfo: {
      name: 'Amira T.',
      city: 'Oran',
      wilaya: 'Oran (31)',
      reviewQuote: 'Les gel pads tiennent super bien, posé en 5 minutes dans ma chambre avant de sortir.',
      rating: 5,
      occasion: 'Weekend Chic',
    },
    matchedProductId: 'glazed-donut-hailey',
    matchedProductName: 'Glazed Donut Chrome Opal',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#GlazedDonut', '#Oran', '#PressOnGelPads', '#CleanGirl'],
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    caption: 'Une cliente satisfaite de plus à Béjaïa ! Strass Swarovski sertis un par un au gel bijou pour une résistance à toute épreuve. Aucun strass qui tombe pendant la fête garanti 💕 #sbrenails #bejaia #strassnails #pressonailsalgerie',
    likes: 395,
    commentsCount: 29,
    timestamp: 'Il y a 1 semaine',
    isClientWorn: true,
    category: 'wedding',
    clientInfo: {
      name: 'Nour El Houda',
      city: 'Béjaïa',
      wilaya: 'Béjaïa (06)',
      reviewQuote: 'Livraison Yalidine ultra rapide en 48h. Les strass brillent de mille feux sous les lumières !',
      rating: 5,
      occasion: 'Soirée de Gala',
    },
    matchedProductId: 'velvet-rose-strass',
    matchedProductName: 'Rose Poudré & Cristaux Swarovski',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#Béjaïa', '#StrassSwarovski', '#PressOnLuxury'],
  },
  {
    id: 'post-5',
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=900&q=80',
    caption: 'Le chic au bureau en toute discrétion. Micro French carrée courte portée par Lyna, avocate à Constantine. Le look le plus élégant et indétectable de la collection 🖋️🤍 #sbrenails #constantine #microfrench #minimalistnails',
    likes: 310,
    commentsCount: 19,
    timestamp: 'Il y a 1 semaine',
    isClientWorn: true,
    category: 'trend',
    clientInfo: {
      name: 'Lyna S.',
      city: 'Constantine',
      wilaya: 'Constantine (25)',
      reviewQuote: 'Ultra naturel, personne ne devine que ce sont des press-on nails. Je les remets chaque semaine.',
      rating: 5,
      occasion: 'Bureau & Quotidien',
    },
    matchedProductId: 'french-micro-carre',
    matchedProductName: 'Micro French Minimaliste',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#MicroFrench', '#Constantine', '#BureauChic'],
  },
  {
    id: 'post-6',
    imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80',
    caption: 'Behind the scenes à l’Atelier d’Azazga ☕️ Finition d’un set personnalisé Moka Swirls avec poudres métallisées bronze. Chaque détail est travaillé à la main avec patience et amour pour nos clientes algériennes ♡ #sbrenails #azazga #faitmain #pressonartist',
    likes: 478,
    commentsCount: 33,
    timestamp: 'Il y a 2 semaines',
    isClientWorn: false,
    category: 'workshop',
    matchedProductId: 'chocolat-latte-swirls',
    matchedProductName: 'Moka Swirls & Feuille Bronze',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#AtelierAzazga', '#HandmadeWithLove', '#MokaSwirls'],
  },
  {
    id: 'post-7',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=80',
    caption: 'Commande sur mesure pour une future mariée à Tlemcen 👰🏻‍♀️🌸 Forme cercueil effilée, dégradé nude rosé et fleurs 3D sculptées. Un kit d’application complet toujours inclus dans l’écrin SB Renails. #sbrenails #tlemcen #mariagealgerien #presson3d',
    likes: 562,
    commentsCount: 51,
    timestamp: 'Il y a 2 semaines',
    isClientWorn: true,
    category: 'wedding',
    clientInfo: {
      name: 'Rania D.',
      city: 'Tlemcen',
      wilaya: 'Tlemcen (13)',
      reviewQuote: 'La finition 3D est digne des plus grands nail bars parisiens ! Merci Célia pour ta gentillesse sur WhatsApp.',
      rating: 5,
      occasion: 'Mariage civil & fête',
    },
    matchedProductName: 'Création Florale 3D Mariée',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#Tlemcen', '#PressOnMariage', '#3DFlowerNails'],
  },
  {
    id: 'post-8',
    imageUrl: 'https://images.unsplash.com/photo-1510520434124-5bc7e6428a04?auto=format&fit=crop&w=900&q=80',
    caption: 'Packaging unboxing par notre cliente Meriem à Blida 💕 Regardez comme le coffret rose poudré est soigné : gel pads, colle de précision, lime et bâtonnet de buis offerts. Le plaisir d’ouvrir son colis Yalidine ! #sbrenails #unboxing #blida #colisyalidine',
    likes: 418,
    commentsCount: 27,
    timestamp: 'Il y a 3 semaines',
    isClientWorn: true,
    category: 'client',
    clientInfo: {
      name: 'Meriem K.',
      city: 'Blida',
      wilaya: 'Blida (09)',
      reviewQuote: 'L’emballage est tellement beau avec la petite carte parfumée et les instructions claires.',
      rating: 5,
      occasion: 'Cadeau & Plaisir',
    },
    matchedProductName: 'Kit d’Application Premium Inclus',
    instagramPostUrl: `${WORKSHOP_INFO.instagramUrl}`,
    tags: ['#Blida', '#PackagingChic', '#PressOnAlgérie'],
  },
];

const LOCAL_STORAGE_KEY = 'sb_renails_instagram_posts';

export function getStoredInstagramPosts(): InstagramPost[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load instagram posts from localStorage', err);
  }
  return INITIAL_INSTAGRAM_POSTS;
}

export function saveInstagramPosts(posts: InstagramPost[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save instagram posts', err);
  }
}

export function addCustomInstagramPost(newPost: Omit<InstagramPost, 'id' | 'timestamp' | 'instagramPostUrl'>): InstagramPost {
  const posts = getStoredInstagramPosts();
  const created: InstagramPost = {
    ...newPost,
    id: `post-${Date.now()}`,
    timestamp: 'À l’instant',
    instagramPostUrl: WORKSHOP_INFO.instagramUrl || 'https://www.instagram.com/sb.renails/?__pwa=1',
  };
  const updated = [created, ...posts];
  saveInstagramPosts(updated);
  return created;
}

export function resetInstagramPostsToDefault(): InstagramPost[] {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // Ignore
  }
  return INITIAL_INSTAGRAM_POSTS;
}
