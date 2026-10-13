import React from 'react';
import { Ruler, Sparkles, Check, ArrowRight, AlertCircle } from 'lucide-react';

interface SizingGuideSectionProps {
  onStartCustomOrder: () => void;
}

export const SizingGuideSection: React.FC<SizingGuideSectionProps> = ({ onStartCustomOrder }) => {
  const standardSizes = [
    { name: 'XS', thumb: '14mm', index: '11mm', middle: '12mm', ring: '10mm', pinky: '8mm' },
    { name: 'S', thumb: '15mm', index: '12mm', middle: '13mm', ring: '11mm', pinky: '9mm' },
    { name: 'M', thumb: '16mm', index: '13mm', middle: '14mm', ring: '12mm', pinky: '10mm' },
    { name: 'L', thumb: '17mm', index: '14mm', middle: '15mm', ring: '13mm', pinky: '11mm' },
  ];

  return (
    <section id="measurements" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#fdfaf8] rounded-3xl border border-[#ecd0c7] shadow-md p-6 sm:p-10 lg:p-12 overflow-hidden relative">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#fceee9] rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fceee9] text-xs font-semibold text-[#a85243] border border-[#f0ded8]">
            <Ruler className="w-3.5 h-3.5" />
            <span>Fini la pièce de monnaie imprécise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2e1a23]">
            Le Guide Illustré des Mesures (en millimètres)
          </h2>
          <p className="text-xs sm:text-sm text-[#694e57]">
            Pour que vos capsules épousent parfaitement la courbure de vos ongles sans serrer ni décoller, prenez vos mesures en 2 minutes chrono avec du scotch et une règle.
          </p>
        </div>

        {/* 3 Step measurement methodology */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#fcf3f0] p-5 rounded-2xl border border-[#f0ded8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#2e1a23] text-white text-xs font-bold flex items-center justify-center">1</span>
            <h4 className="font-serif text-base font-bold text-[#2e1a23]">Collez un morceau de scotch</h4>
            <p className="text-xs text-[#694e57] leading-relaxed">
              Placez un petit bout de ruban adhésif transparent horizontalement sur la partie la plus large de votre ongle naturel.
            </p>
          </div>

          <div className="bg-[#fcf3f0] p-5 rounded-2xl border border-[#f0ded8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#2e1a23] text-white text-xs font-bold flex items-center justify-center">2</span>
            <h4 className="font-serif text-base font-bold text-[#2e1a23]">Marquez les bords au stylo</h4>
            <p className="text-xs text-[#694e57] leading-relaxed">
              À l'aide d'un stylo ou feutre fin, tracez un petit repère précis sur chaque bord latéral où l'ongle touche la peau.
            </p>
          </div>

          <div className="bg-[#fcf3f0] p-5 rounded-2xl border border-[#f0ded8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#2e1a23] text-white text-xs font-bold flex items-center justify-center">3</span>
            <h4 className="font-serif text-base font-bold text-[#2e1a23]">Mesurez sur une règle en mm</h4>
            <p className="text-xs text-[#694e57] leading-relaxed">
              Décollez le scotch et posez-le à plat sur une règle. Comptez les millimètres entre vos deux repères (ex: 15 mm).
            </p>
          </div>
        </div>

        {/* Standard sizes table reference */}
        <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-5 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a85243]">
              Tailles standards de référence (ou saisie personnalisée au mm) :
            </h4>
            <span className="text-[11px] text-[#785b65]">Mesures types</span>
          </div>

          <table className="w-full text-xs text-left text-[#2e1a23] min-w-[500px]">
            <thead className="bg-[#fceee9] text-[#785b65] uppercase text-[10px] font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Taille</th>
                <th className="py-2.5 px-3">Pouce (1)</th>
                <th className="py-2.5 px-3">Index (2)</th>
                <th className="py-2.5 px-3">Majeur (3)</th>
                <th className="py-2.5 px-3">Annulaire (4)</th>
                <th className="py-2.5 px-3 rounded-r-lg">Auriculaire (5)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ded8]">
              {standardSizes.map((row) => (
                <tr key={row.name} className="hover:bg-[#fcf3f0]">
                  <td className="py-2.5 px-3 font-bold text-[#a85243]">{row.name}</td>
                  <td className="py-2.5 px-3">{row.thumb}</td>
                  <td className="py-2.5 px-3">{row.index}</td>
                  <td className="py-2.5 px-3">{row.middle}</td>
                  <td className="py-2.5 px-3">{row.ring}</td>
                  <td className="py-2.5 px-3">{row.pinky}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Creator Guarantee Box */}
        <div className="p-4 rounded-xl bg-[#fceee9]/70 border border-[#ecd0c7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#a85243] shrink-0 mt-0.5" />
            <p className="text-xs text-[#4a2835]">
              <strong>Un doute entre deux millimètres ?</strong> Choisissez toujours le millimètre supérieur (ex: 15 mm au lieu de 14.5 mm) car vous pourrez légèrement limer les côtés de la capsule avec la lime fournie.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-colors cursor-pointer"
          >
            <span>Choisir mon modèle au catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
