import React from 'react';
import { Sparkles, Ruler, Wand2, Package, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartOrder: () => void;
  onOpenMeasurements: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOrder, onOpenMeasurements }) => {
  const steps = [
    {
      number: '01',
      title: 'Sélectionnez votre set',
      desc: 'Parcourez notre collection permanente ou demandez une création 100% sur mesure inspirée de vos photos.',
      icon: <Sparkles className="w-5 h-5 text-[#a85243]" />,
    },
    {
      number: '02',
      title: 'Mesurez vos 10 ongles',
      desc: 'Mesurez la largeur de chaque doigt en millimètres (à l’aide d’un ruban adhésif et d’une règle). Plus de pièces de monnaie aléatoires !',
      icon: <Ruler className="w-5 h-5 text-[#a85243]" />,
    },
    {
      number: '03',
      title: 'Fabrication artisanale',
      desc: 'Célia réalise votre set à la main : préparation de la capsule, couches de gel, nail art minutieux et scellement longue durée.',
      icon: <Wand2 className="w-5 h-5 text-[#d4af37]" />,
    },
    {
      number: '04',
      title: 'Remise ou Livraison',
      desc: 'Retirez gratuitement votre colis à Azazga chez Boukersi (face BADR) ou recevez-le chez vous avec Yalidine Express.',
      icon: <Package className="w-5 h-5 text-[#a85243]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C94F7C]">
          Simple, clair & sans stress ♡
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29242A]">
          Comment se déroule votre commande ?
        </h2>
        <p className="text-xs sm:text-sm text-[#785b65]">
          Un parcours pensé pour vous garantir des ongles sur mesure qui s'ajustent parfaitement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#fdfaf8] rounded-2xl p-6 border border-[#ecd0c7] relative flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-[#ecd0c7] group-hover:text-[#a85243] transition-colors">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#fceee9] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2e1a23] mb-2">{step.title}</h3>
              <p className="text-xs text-[#694e57] leading-relaxed">{step.desc}</p>
            </div>

            {idx === 1 && (
              <button
                onClick={onOpenMeasurements}
                className="mt-4 text-left text-xs font-semibold text-[#a85243] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Voir le guide des mesures</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onStartOrder}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#2e1a23] text-[#fdfaf8] hover:bg-[#a85243] transition-all cursor-pointer shadow-md"
        >
          <span>Commencer ma commande</span>
          <ArrowRight className="w-4 h-4 text-[#e8a598]" />
        </button>
      </div>
    </section>
  );
};
