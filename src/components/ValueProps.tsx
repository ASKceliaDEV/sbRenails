import React from 'react';
import { Sparkles, Shield, Clock, Repeat, DollarSign, Heart } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="w-5 h-5 text-[#a85243]" />,
      title: 'Pose en 10 minutes chrono',
      desc: 'Terminé les après-midi de 3 heures bloquée en salon. Posez vos ongles confortablement chez vous avant un événement.',
    },
    {
      icon: <Shield className="w-5 h-5 text-[#a85243]" />,
      title: 'Zéro dommage pour vos ongles',
      desc: 'Aucun ponçage agressif à la ponceuse électrique. Vos ongles naturels restent sains, solides et protégés.',
    },
    {
      icon: <Repeat className="w-5 h-5 text-[#a85243]" />,
      title: 'Réutilisables 3 à 5 fois',
      desc: 'Grâce aux gel pads autocollants fournis, retirez-les sans solvant acétone et réutilisez votre set pour d’autres occasions.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#d4af37]" />,
      title: 'Sur-mesure au millimètre',
      desc: 'Chaque ongle est peint à la main et calibré exactement à votre largeur d’ongle naturelle. Fini les ongles trop petits ou qui débordent.',
    },
    {
      icon: <DollarSign className="w-5 h-5 text-[#a85243]" />,
      title: 'Économique & rentable',
      desc: 'Un seul achat pour plusieurs utilisations au lieu de payer un nouveau remplissage toutes les 3 semaines en institut.',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#a85243]" />,
      title: 'Fabrication locale & artisanale',
      desc: 'Conçu avec passion et précision par une créatrice en Algérie avec des capsules en gel de haute qualité professionnelle.',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#fcf3f0]/60 border-y border-[#f0ded8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#a85243]">
            L'excellence du fait main
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2e1a23]">
            Pourquoi adopter les Press-on Nails SB Renails ?
          </h2>
          <p className="text-xs sm:text-sm text-[#785b65]">
            La liberté d’avoir une manucure de star quand vous le souhaitez, sans abîmer vos mains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-[#fdfaf8] rounded-2xl p-5 border border-[#ecd0c7] hover:border-[#dfb9ae] shadow-xs hover:shadow-sm transition-all space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fceee9] flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2e1a23]">{item.title}</h3>
              <p className="text-xs text-[#694e57] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
