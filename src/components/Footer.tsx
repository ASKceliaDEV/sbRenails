import React from 'react';
import { MapPin, Sparkles, MessageCircle, Instagram, Heart, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WORKSHOP_INFO } from '../data/catalog';

interface FooterProps {
  onNav: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNav }) => {
  return (
    <footer className="bg-[#2e1a23] text-[#f7d6cd] pt-14 pb-10 border-t border-[#4a2835]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#4a2835]">
          
          {/* Brand Col: SB Renails */}
          <div className="space-y-3">
            <BrandLogo variant="light" size="lg" />
            <p className="text-xs text-[#fceee9]/80 leading-relaxed pt-1">
              Atelier artisanal algérien spécialisé dans la confection de press-on nails réutilisables haut de gamme. Chaque ongle est peint à la main selon votre morphologie naturelle.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={WORKSHOP_INFO.instagramUrl || 'https://www.instagram.com/sb.renails/?__pwa=1'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#d6249f]/80 to-[#fd5949]/80 hover:from-[#d6249f] hover:to-[#fd5949] text-white text-xs font-medium transition-all shadow-xs"
                title={`Suivre SB Renails sur Instagram (${WORKSHOP_INFO.instagramHandle || '@sb.renails'})`}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram {WORKSHOP_INFO.instagramHandle || '@sb.renails'}</span>
              </a>
              <a
                href="https://wa.me/213550000000?text=Bonjour%20C%C3%A9lia%20!%20J'aimerais%20des%20informations%20sur%20SB%20Renails."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all shadow-xs"
                title="Contacter l'atelier sur WhatsApp Business"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Business</span>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => onNav('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Catalogue des modèles
                </button>
              </li>
              <li>
                <button onClick={() => onNav('custom')} className="hover:text-white transition-colors cursor-pointer">
                  Création sur mesure
                </button>
              </li>
              <li>
                <button onClick={() => onNav('measurements')} className="hover:text-white transition-colors cursor-pointer">
                  Guide des mesures (mm)
                </button>
              </li>
              <li>
                <button onClick={() => onNav('gallery')} className="hover:text-white transition-colors cursor-pointer text-[#F9E5EC] flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-[#C94F7C]" />
                  <span>Galerie photos clientes</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNav('delivery')} className="hover:text-white transition-colors cursor-pointer">
                  Point relais Azazga & Yalidine
                </button>
              </li>
            </ul>
          </div>

          {/* Pickup address & atelier */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Retrait & Atelier
            </h4>
            <div className="space-y-2 text-[#fceee9]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e8a598] shrink-0 mt-0.5" />
                <span>
                  <strong>Azazga (Retrait gratuit 0 DA) :</strong><br />
                  Boutique de vêtements Boukersi,<br />
                  En face de la banque BADR, Azazga.
                </span>
              </div>
              <div className="pt-2 text-[11px]">
                <strong>Livraison nationale :</strong><br />
                Envoi sécurisé Yalidine Express dans les 58 Wilayas.
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Engagements & Qualité
            </h4>
            <ul className="space-y-2 text-[#fceee9]/80">
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Capsules en gel Apres souples</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#e8a598]" />
                <span>Peint à la main au pinceau fin</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kit de pose complet offert</span>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={() => onNav('admin')}
                className="text-[11px] text-[#fceee9]/60 hover:text-white underline cursor-pointer"
              >
                Accès administrateur créatrice
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#fceee9]/60 gap-4">
          <p>© {new Date().getFullYear()} SB Renails. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Fait avec amour pour sublimer vos mains en Algérie ✨
          </p>
        </div>
      </div>
    </footer>
  );
};
