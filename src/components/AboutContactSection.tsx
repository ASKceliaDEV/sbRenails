import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Heart, Sparkles, Store, Clock } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/catalog';

interface AboutContactSectionProps {
  initialView?: 'about' | 'contact';
  onExploreCatalog: () => void;
}

export const AboutContactSection: React.FC<AboutContactSectionProps> = ({
  initialView = 'about',
  onExploreCatalog,
}) => {
  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Section À Propos */}
      <section id="about" className="bg-[#FFF5F8] rounded-3xl p-6 sm:p-10 border border-[#EEDDE3] space-y-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C94F7C] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>À Propos de SB Renails</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29242A]">
            L'Art des Press-on Nails Faits Main en Algérie ♡
          </h2>
          <p className="text-sm text-[#6F656A] leading-relaxed">
            Fondée par Célia, <strong>SB Renails</strong> est un atelier artisanal né d'une passion pour le nail art haut de gamme et le respect de l'ongle naturel.
          </p>
          <p className="text-sm text-[#6F656A] leading-relaxed">
            Chaque capsule est peinte à la main avec du gel professionnel de salon. Contrairement aux poses acryliques agressives, nos press-on nails se posent en 10 minutes à la maison, ne causent aucun dommage et sont <strong>réutilisables 3 à 5 fois</strong> grâce à nos gel pads de haute qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-[#EEDDE3] space-y-1">
            <span className="text-xl">✨</span>
            <h4 className="font-serif font-bold text-sm text-[#29242A]">100% Sur Mesure</h4>
            <p className="text-xs text-[#6F656A]">Ajusté à vos 10 doigts au millimètre près.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#EEDDE3] space-y-1">
            <span className="text-xl">📦</span>
            <h4 className="font-serif font-bold text-sm text-[#29242A]">Kit Complet Offert</h4>
            <p className="text-xs text-[#6F656A]">Colle, 24 pads, lime et repousse-cuticules inclus.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#EEDDE3] space-y-1">
            <span className="text-xl">📍</span>
            <h4 className="font-serif font-bold text-sm text-[#29242A]">Retrait à Azazga</h4>
            <p className="text-xs text-[#6F656A]">Point relais gratuit chez Boukersi (face BADR).</p>
          </div>
        </div>
      </section>

      {/* 2. Section Contact */}
      <section id="contact" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEDDE3] shadow-xs space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C94F7C] uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-[#C94F7C]" />
            <span>Nous Contacter</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#29242A]">
            Une question ou une demande spéciale ?
          </h2>
          <p className="text-sm text-[#6F656A]">
            Nous vous répondons rapidement avec le sourire sur WhatsApp ou Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Card WhatsApp direct */}
          <div className="bg-[#FFF5F8] p-5 rounded-2xl border border-[#EEDDE3] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#29242A]">WhatsApp Atelier</h4>
              <p className="text-xs text-[#6F656A] leading-relaxed">
                Le moyen le plus rapide pour échanger sur vos inspirations, valider vos tailles et suivre votre commande en direct.
              </p>
            </div>
            <a
              href={`https://wa.me/${WORKSHOP_INFO.whatsappNumber || '213550000000'}?text=${encodeURIComponent("Bonjour Célia ! ✨ J'aimerais des informations sur SB Renails.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>

          {/* Card Instagram officiel */}
          <div className="bg-[#FFF5F8] p-5 rounded-2xl border border-[#EEDDE3] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#29242A]">Instagram Officiel</h4>
              <p className="text-xs text-[#6F656A] leading-relaxed">
                Suivez nos poses portées, nos coulisses en atelier et envoyez vos messages directs à {WORKSHOP_INFO.instagramHandle || '@sb.renails'}.
              </p>
            </div>
            <a
              href={WORKSHOP_INFO.instagramUrl || 'https://www.instagram.com/sb.renails/?__pwa=1'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#d6249f] to-[#fd5949] text-white hover:opacity-95 transition-all shadow-xs"
            >
              <Instagram className="w-4 h-4" />
              <span>Voir {WORKSHOP_INFO.instagramHandle || '@sb.renails'}</span>
            </a>
          </div>

          {/* Card Point relais Boukersi */}
          <div className="bg-[#F9E5EC]/60 p-5 rounded-2xl border border-[#EEDDE3] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#C94F7C] text-white flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#29242A]">Point Relais Azazga</h4>
              <div className="text-xs text-[#6F656A] space-y-1.5">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C94F7C] shrink-0 mt-0.5" />
                  <span>Boutique de vêtements Boukersi (en face de la BADR), Azazga centre.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Clock className="w-4 h-4 text-[#C94F7C] shrink-0 mt-0.5" />
                  <span>Du samedi au jeudi (heures d'ouverture du magasin).</span>
                </p>
              </div>
            </div>
            <div className="text-[11px] font-semibold text-[#C94F7C] bg-white py-1.5 px-3 rounded-full text-center border border-[#EEDDE3]">
              Retrait 100% gratuit
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
