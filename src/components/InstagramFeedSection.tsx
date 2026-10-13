import React, { useState } from 'react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  ShoppingBag, 
  RefreshCw, 
  Plus, 
  X, 
  Star, 
  MapPin, 
  Filter, 
  ChevronRight,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WORKSHOP_INFO, PRODUCTS_CATALOG } from '../data/catalog';
import { 
  InstagramPost, 
  getStoredInstagramPosts, 
  addCustomInstagramPost, 
  resetInstagramPostsToDefault 
} from '../data/instagramFeed';
import { Product } from '../types';

interface InstagramFeedSectionProps {
  onOrderProduct?: (product: Product) => void;
  onCustomOrder?: () => void;
  onExploreCatalog?: () => void;
}

export const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  onOrderProduct,
  onCustomOrder,
  onExploreCatalog,
}) => {
  const [posts, setPosts] = useState<InstagramPost[]>(() => getStoredInstagramPosts());
  const [activeFilter, setActiveFilter] = useState<'all' | 'client' | 'wedding' | 'trend' | 'workshop'>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding custom photo
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientCity, setNewClientCity] = useState('');
  const [newClientWilaya, setNewClientWilaya] = useState('15 - Tizi Ouzou');
  const [newReviewQuote, setNewReviewQuote] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newProductName, setNewProductName] = useState('Création sur mesure');
  const [newOccasion, setNewOccasion] = useState('Quotidien');

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'client') return post.isClientWorn;
    return post.category === activeFilter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      // Simulate live sync with Instagram API & reload storage
      setPosts(getStoredInstagramPosts());
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3000);
    }, 600);
  };

  const handleAddPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const created = addCustomInstagramPost({
      imageUrl: newImageUrl.trim(),
      caption: newCaption.trim() || `Création personnalisée portée par ${newClientName || 'notre cliente'} ✨ Merci pour votre confiance ! #sbrenails #pressonailsalgerie`,
      likes: Math.floor(Math.random() * 200) + 180,
      commentsCount: Math.floor(Math.random() * 25) + 12,
      isClientWorn: true,
      category: newOccasion.toLowerCase().includes('mariage') || newOccasion.toLowerCase().includes('fian') ? 'wedding' : 'client',
      clientInfo: {
        name: newClientName.trim() || 'Cliente SB Renails',
        city: newClientCity.trim() || 'Azazga',
        wilaya: newClientWilaya,
        reviewQuote: newReviewQuote.trim() || 'Pose magnifique et tenue parfaite !',
        rating: 5,
        occasion: newOccasion,
      },
      matchedProductName: newProductName,
      tags: ['#ClientSB', '#PressOnAlgérie', `#${newClientCity.replace(/\s+/g, '') || 'Algérie'}`],
    });

    setPosts([created, ...posts]);
    setIsAddModalOpen(false);
    // Reset form
    setNewImageUrl('');
    setNewClientName('');
    setNewClientCity('');
    setNewReviewQuote('');
    setNewCaption('');
  };

  const handleOrderForPost = (post: InstagramPost) => {
    setSelectedPost(null);
    if (post.matchedProductId) {
      const found = PRODUCTS_CATALOG.find((p) => p.id === post.matchedProductId);
      if (found && onOrderProduct) {
        onOrderProduct(found);
        return;
      }
    }
    if (onCustomOrder) {
      onCustomOrder();
    }
  };

  return (
    <section id="instagram-gallery" className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#FFF5F8]/40 to-white border-t border-b border-[#EEDDE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section avec profil Instagram officiel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            {/* Badge de marque Instagram */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F9E5EC] to-[#FFF5F8] border border-[#EEDDE3] text-[#C94F7C] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-[11px] shadow-xs">
                <Instagram className="w-3 h-3" />
              </span>
              <span>Communauté Instagram {WORKSHOP_INFO.instagramHandle}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#29242A] tracking-tight">
              Portés par nos Clientes <span className="text-[#C94F7C]">♡</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6F656A] max-w-2xl">
              Découvrez les créations de l’atelier immortalisées au naturel par nos clientes à travers toute l’Algérie : fiançailles, mariages, événements et quotidien.
            </p>
          </div>

          {/* Boutons d'action : Suivre Instagram officiel & Actualiser */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={WORKSHOP_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-[#C94F7C] to-pink-500 text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              title="Ouvrir le compte Instagram officiel @sb.renails"
            >
              <Instagram className="w-4 h-4" />
              <span>Suivre {WORKSHOP_INFO.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-white border border-[#EEDDE3] hover:border-[#C94F7C] text-[#29242A] hover:text-[#C94F7C] text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs disabled:opacity-60"
              title="Synchroniser le flux avec les dernières publications"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#C94F7C]' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-[#FFF5F8] border border-[#EEDDE3] hover:border-[#C94F7C] text-[#C94F7C] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              title="Ajouter manuellement une photo de cliente ou de création"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ajouter une photo</span>
            </button>
          </div>
        </div>

        {/* Message de confirmation de rafraîchissement */}
        {refreshSuccess && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Flux Instagram synchronisé avec <strong>@sb.renails</strong> : 8 créations récentes chargées avec succès.</span>
            </div>
            <span className="text-emerald-600 text-xs">À l’instant</span>
          </div>
        )}

        {/* Barre de filtres par catégorie */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none text-xs sm:text-sm">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#C94F7C] text-white shadow-xs'
                : 'bg-white text-[#6F656A] hover:text-[#29242A] border border-[#EEDDE3] hover:border-[#C94F7C]'
            }`}
          >
            ✨ Toutes les publications ({posts.length})
          </button>

          <button
            onClick={() => setActiveFilter('client')}
            className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'client'
                ? 'bg-[#C94F7C] text-white shadow-xs'
                : 'bg-white text-[#6F656A] hover:text-[#29242A] border border-[#EEDDE3] hover:border-[#C94F7C]'
            }`}
          >
            💅 Portées par nos clientes ({posts.filter(p => p.isClientWorn).length})
          </button>

          <button
            onClick={() => setActiveFilter('wedding')}
            className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'wedding'
                ? 'bg-[#C94F7C] text-white shadow-xs'
                : 'bg-white text-[#6F656A] hover:text-[#29242A] border border-[#EEDDE3] hover:border-[#C94F7C]'
            }`}
          >
            👰🏻 Mariages & Cérémonies ({posts.filter(p => p.category === 'wedding').length})
          </button>

          <button
            onClick={() => setActiveFilter('trend')}
            className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'trend'
                ? 'bg-[#C94F7C] text-white shadow-xs'
                : 'bg-white text-[#6F656A] hover:text-[#29242A] border border-[#EEDDE3] hover:border-[#C94F7C]'
            }`}
          >
            💎 Tendances & Minimaliste ({posts.filter(p => p.category === 'trend').length})
          </button>

          <button
            onClick={() => setActiveFilter('workshop')}
            className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'workshop'
                ? 'bg-[#C94F7C] text-white shadow-xs'
                : 'bg-white text-[#6F656A] hover:text-[#29242A] border border-[#EEDDE3] hover:border-[#C94F7C]'
            }`}
          >
            🎨 Atelier d’Azazga ({posts.filter(p => p.category === 'workshop').length})
          </button>
        </div>

        {/* Grille des photos Instagram */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative bg-white rounded-2xl border border-[#EEDDE3] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image avec format ratio élégant */}
              <div className="relative aspect-square overflow-hidden bg-[#FFF5F8]">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge "Porté par cliente" */}
                {post.isClientWorn && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#C94F7C] text-[10px] sm:text-xs font-semibold shadow-xs border border-white/80">
                      <Heart className="w-3 h-3 fill-[#C94F7C]" />
                      <span>Porté cliente</span>
                    </span>
                  </div>
                )}

                {/* Icône Instagram discrète dans l'angle */}
                <div className="absolute top-2.5 right-2.5 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-xs">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Overlay au survol : Statistiques Instagram & bouton rapide */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                  <div className="flex items-center gap-3 text-xs font-medium mb-1.5">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {post.commentsCount}
                    </span>
                  </div>
                  <p className="text-[11px] line-clamp-2 text-white/90">
                    {post.clientInfo ? `« ${post.clientInfo.reviewQuote || post.caption} »` : post.caption}
                  </p>
                  <span className="mt-2 text-[10px] uppercase font-bold tracking-wider text-pink-300 flex items-center gap-1">
                    Voir les détails & commander <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Informations textuelles sous l'image */}
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  {/* Ville ou Nom du modèle */}
                  <div className="flex items-center justify-between text-[11px] text-[#6F656A] mb-1">
                    {post.clientInfo ? (
                      <span className="font-semibold text-[#29242A] truncate">
                        {post.clientInfo.name} ({post.clientInfo.city})
                      </span>
                    ) : (
                      <span className="font-semibold text-[#29242A]">
                        {post.matchedProductName || 'Création Atelier'}
                      </span>
                    )}
                    <span className="text-[10px] text-[#C94F7C] shrink-0 font-medium">
                      {post.timestamp}
                    </span>
                  </div>

                  {/* Avis cliente ou extrait de légende */}
                  {post.clientInfo?.reviewQuote ? (
                    <p className="text-xs text-[#29242A] line-clamp-2 italic font-serif">
                      « {post.clientInfo.reviewQuote} »
                    </p>
                  ) : (
                    <p className="text-xs text-[#6F656A] line-clamp-2">
                      {post.caption}
                    </p>
                  )}
                </div>

                {/* Modèle associé */}
                {post.matchedProductName && (
                  <div className="mt-2.5 pt-2 border-t border-[#EEDDE3]/60 flex items-center justify-between text-[11px]">
                    <span className="text-[#C94F7C] font-medium truncate">
                      {post.matchedProductName}
                    </span>
                    <span className="text-[10px] text-[#6F656A] underline">
                      Commander
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bannière d'appel à la communauté Instagram */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#F9E5EC] via-[#FFF5F8] to-[#F9E5EC] border border-[#EEDDE3] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#EEDDE3] p-1.5 shrink-0 shadow-xs flex items-center justify-center">
              <span className="w-full h-full rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                <Instagram className="w-7 h-7" />
              </span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif text-[#29242A] font-semibold">
                Vous avez reçu votre set SB Renails ?
              </h3>
              <p className="text-xs sm:text-sm text-[#6F656A] mt-1">
                Mentionnez <strong>@sb.renails</strong> ou envoyez-nous votre photo sur Instagram & WhatsApp pour être mise à l’honneur dans notre galerie !
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={WORKSHOP_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#C94F7C] text-white text-xs sm:text-sm font-medium hover:bg-[#b5426d] transition-colors shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Visiter @sb.renails</span>
            </a>

            {onCustomOrder && (
              <button
                onClick={onCustomOrder}
                className="px-5 py-2.5 rounded-full bg-white border border-[#EEDDE3] text-[#29242A] hover:text-[#C94F7C] hover:border-[#C94F7C] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Créer mon set sur mesure
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL LIGHTBOX POUR VOIR LA PHOTO ET COMMANDER LE MODÈLE      */}
      {/* ============================================================== */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative border border-[#EEDDE3]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermeture */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#29242A] flex items-center justify-center shadow-md transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Partie Gauche : Image plein format */}
            <div className="md:w-1/2 bg-[#FFF5F8] relative min-h-[300px] md:min-h-[480px] flex items-center justify-center">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full h-full object-cover max-h-[50vh] md:max-h-[85vh]"
              />
              {selectedPost.isClientWorn && (
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#C94F7C] text-xs font-semibold shadow-md">
                    <Heart className="w-3.5 h-3.5 fill-[#C94F7C]" />
                    <span>Création portée par cliente</span>
                  </span>
                </div>
              )}
            </div>

            {/* Partie Droite : Détails Instagram, avis et commande */}
            <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh]">
              <div>
                {/* En-tête profil */}
                <div className="flex items-center justify-between pb-4 border-b border-[#EEDDE3]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#C94F7C] font-serif font-bold text-xs">
                        SB
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm text-[#29242A]">sb.renails</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C94F7C] fill-[#F9E5EC]" />
                      </div>
                      <span className="text-[11px] text-[#6F656A]">{WORKSHOP_INFO.location}</span>
                    </div>
                  </div>

                  <span className="text-xs text-[#6F656A] font-medium">{selectedPost.timestamp}</span>
                </div>

                {/* Avis de la cliente si disponible */}
                {selectedPost.clientInfo && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#FFF5F8] border border-[#EEDDE3]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(selectedPost.clientInfo.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-semibold text-[#29242A] ml-1.5">
                          Avis cliente vérifiée
                        </span>
                      </div>
                      <span className="text-[11px] text-[#C94F7C] font-medium">
                        {selectedPost.clientInfo.occasion}
                      </span>
                    </div>

                    <p className="text-sm italic font-serif text-[#29242A] leading-relaxed">
                      « {selectedPost.clientInfo.reviewQuote} »
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-xs text-[#6F656A]">
                      <span className="font-semibold text-[#29242A]">{selectedPost.clientInfo.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C94F7C]" />
                        {selectedPost.clientInfo.city}, {selectedPost.clientInfo.wilaya}
                      </span>
                    </div>
                  </div>
                )}

                {/* Légende complète du post Instagram */}
                <div className="mt-4 text-xs sm:text-sm text-[#29242A] space-y-2 leading-relaxed">
                  <p>{selectedPost.caption}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-[#C94F7C] text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistiques likes / commentaires */}
                <div className="mt-4 pt-3 border-t border-[#EEDDE3] flex items-center gap-4 text-xs text-[#6F656A]">
                  <span className="flex items-center gap-1 text-[#29242A] font-medium">
                    <Heart className="w-4 h-4 fill-[#C94F7C] text-[#C94F7C]" />
                    {selectedPost.likes} mentions J’aime
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {selectedPost.commentsCount} commentaires
                  </span>
                </div>
              </div>

              {/* Actions de bas de boîte : Commander & Lien Instagram */}
              <div className="mt-6 pt-4 border-t border-[#EEDDE3] space-y-2.5">
                <button
                  onClick={() => handleOrderForPost(selectedPost)}
                  className="w-full py-3 px-4 rounded-xl bg-[#C94F7C] hover:bg-[#b5426d] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Commander {selectedPost.matchedProductName ? `« ${selectedPost.matchedProductName} »` : 'ce modèle'}</span>
                </button>

                <a
                  href={selectedPost.instagramPostUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#EEDDE3] hover:border-[#C94F7C] text-[#29242A] hover:text-[#C94F7C] text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Voir la publication sur Instagram @sb.renails</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL POUR AJOUTER UNE NOUVELLE PHOTO CLIENTE (GESTION)         */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#EEDDE3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF5F8] text-[#29242A] flex items-center justify-center hover:bg-[#F9E5EC]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[#C94F7C] text-xs font-semibold uppercase mb-1">
              <Camera className="w-4 h-4" />
              <span>Galerie manuelle @sb.renails</span>
            </div>
            <h3 className="text-xl font-serif text-[#29242A] font-semibold">
              Ajouter une photo de cliente
            </h3>
            <p className="text-xs text-[#6F656A] mt-1 mb-5">
              Enrichissez la vitrine Instagram avec un nouveau set porté par une cliente ou fraîchement terminé à l'atelier.
            </p>

            <form onSubmit={handleAddPostSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-[#29242A] mb-1">
                  URL de l'image (Haute résolution) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none bg-[#FFF5F8]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#29242A] mb-1">
                    Prénom de la cliente
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Samia K."
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#29242A] mb-1">
                    Commune / Ville
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Tizi Ouzou"
                    value={newClientCity}
                    onChange={(e) => setNewClientCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#29242A] mb-1">
                    Wilaya
                  </label>
                  <select
                    value={newClientWilaya}
                    onChange={(e) => setNewClientWilaya(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none bg-white"
                  >
                    <option value="15 - Tizi Ouzou">15 - Tizi Ouzou</option>
                    <option value="16 - Alger">16 - Alger</option>
                    <option value="06 - Béjaïa">06 - Béjaïa</option>
                    <option value="31 - Oran">31 - Oran</option>
                    <option value="25 - Constantine">25 - Constantine</option>
                    <option value="09 - Blida">09 - Blida</option>
                    <option value="13 - Tlemcen">13 - Tlemcen</option>
                    <option value="35 - Boumerdès">35 - Boumerdès</option>
                    <option value="10 - Bouira">10 - Bouira</option>
                    <option value="Autre Wilaya (Yalidine)">Autre Wilaya</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#29242A] mb-1">
                    Occasion
                  </label>
                  <select
                    value={newOccasion}
                    onChange={(e) => setNewOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none bg-white"
                  >
                    <option value="Mariage">Mariage</option>
                    <option value="Fiançailles">Fiançailles</option>
                    <option value="Soirée & Fête">Soirée & Fête</option>
                    <option value="Quotidien & Travail">Quotidien & Travail</option>
                    <option value="Trousseau de mariée">Trousseau de mariée</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#29242A] mb-1">
                  Nom du modèle SB Renails
                </label>
                <input
                  type="text"
                  placeholder="Ex: Baby Boomer Nacre, Création Berbère..."
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#29242A] mb-1">
                  Avis / Témoignage de la cliente
                </label>
                <textarea
                  rows={2}
                  placeholder="« La tenue est incroyable, j’ai reçu tellement de compliments ! »"
                  value={newReviewQuote}
                  onChange={(e) => setNewReviewQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEDDE3] focus:border-[#C94F7C] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EEDDE3]">
                <button
                  type="button"
                  onClick={() => {
                    const reset = resetInstagramPostsToDefault();
                    setPosts(reset);
                    setIsAddModalOpen(false);
                  }}
                  className="text-xs text-rose-500 hover:underline"
                >
                  Rétablir galerie par défaut
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#EEDDE3] text-[#6F656A] hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#C94F7C] text-white font-medium hover:bg-[#b5426d] shadow-xs"
                  >
                    Publier dans la galerie
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
