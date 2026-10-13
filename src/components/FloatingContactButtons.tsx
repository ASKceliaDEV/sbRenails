import React, { useState } from 'react';
import { MessageCircle, Instagram, X } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/catalog';

export const FloatingContactButtons: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const whatsappUrl = `https://wa.me/${WORKSHOP_INFO.whatsappNumber || '213550000000'}?text=${encodeURIComponent(
    "Bonjour Célia ! ✨ J'aimerais des informations ou passer commande chez SB Renails."
  )}`;
  const instagramUrl = WORKSHOP_INFO.instagramUrl || 'https://www.instagram.com/sb.renails/?__pwa=1';
  const instagramHandle = WORKSHOP_INFO.instagramHandle || '@sb.renails';

  return (
    <aside
      aria-label="Contact direct et réseaux sociaux"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* Quick message badge on load */}
      {showTooltip && (
        <div className="pointer-events-auto max-w-[210px] bg-white text-[#29242A] text-xs py-2 px-3 rounded-2xl shadow-lg border border-[#EEDDE3] animate-fade-in flex items-start gap-2 relative">
          <div className="flex-1 leading-snug">
            <span className="font-bold text-[#C94F7C] block text-[11px] uppercase tracking-wide">
              Besoin d'un conseil ?
            </span>
            <p className="text-[11px] text-[#6F656A]">
              Discutez en direct sur WhatsApp ou découvrez nos poses sur Instagram !
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Fermer la bulle d'aide"
            className="text-[#6F656A] hover:text-[#29242A] p-0.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button Group */}
      <div className="flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Instagram Floating Button */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visiter notre page Instagram SB Renails"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          title={`Voir nos créations sur Instagram (${instagramHandle})`}
        >
          <Instagram className="w-6 h-6 transition-transform group-hover:scale-110" />
          
          {/* Label tooltip on hover */}
          <span className="absolute right-14 bg-[#29242A] text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            Instagram {instagramHandle}
          </span>
        </a>

        {/* WhatsApp Business Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter l'atelier SB Renails sur WhatsApp"
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          title="Commander ou poser une question sur WhatsApp Business"
        >
          {/* Subtle pulse effect */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none"></span>

          <MessageCircle className="w-7 h-7 relative z-10 transition-transform group-hover:scale-110" />

          {/* Label tooltip on hover */}
          <span className="absolute right-15 bg-emerald-950 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp Business (Réponse rapide)
          </span>
        </a>
      </div>
    </aside>
  );
};
