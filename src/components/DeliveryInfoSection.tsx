import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, Store, Clock, Calculator, Sparkles } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/catalog';
import { ALGERIA_WILAYAS } from '../data/algeria';

export const DeliveryInfoSection: React.FC = () => {
  const [selectedWilayaCode, setSelectedWilayaCode] = useState('15'); // Tizi Ouzou par défaut

  const selectedWilaya = ALGERIA_WILAYAS.find((w) => w.code === selectedWilayaCode) || ALGERIA_WILAYAS[14];

  return (
    <section id="delivery" className="py-14 sm:py-20 bg-[#fcf3f0]/50 border-t border-[#f0ded8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#a85243]">
            Modes de remise & Expédition
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2e1a23]">
            Retrait à Azazga & Livraison Yalidine (58 Wilayas)
          </h2>
          <p className="text-xs sm:text-sm text-[#785b65]">
            Que vous soyez sur place à Azazga ou dans n'importe quelle wilaya d'Algérie, vos ongles arrivent dans un emballage renforcé prêt à poser.
          </p>
        </div>

        {/* 2 Main cards: Retrait Boukersi vs Yalidine Express */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
          
          {/* Card 1: Retrait Azazga */}
          <div className="bg-[#fdfaf8] rounded-3xl p-6 sm:p-8 border-2 border-[#ecd0c7] shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#fceee9] border border-[#ecd0c7] flex items-center justify-center">
                  <Store className="w-6 h-6 text-[#a85243]" />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Frais : 0 DA (Gratuit)
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2e1a23]">
                  Retrait en boutique à Azazga
                </h3>
                <p className="text-xs text-[#a85243] font-semibold mt-0.5">
                  Point relais officiel Boukersi
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#4a2835]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#a85243] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Adresse physique :</strong>
                    <p className="text-[#694e57]">Boutique de vêtements Boukersi (en face de la banque BADR), Azazga centre.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#a85243] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Horaires de retrait :</strong>
                    <p className="text-[#694e57]">Du samedi au jeudi, aux heures habituelles d’ouverture du magasin.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Modalités simples :</strong>
                    <p className="text-[#694e57]">Dès que votre set est terminé, vous recevez un message WhatsApp avec votre référence de retrait. Aucun frais de livraison appliqué.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0ded8] bg-[#fceee9]/50 -mx-6 -mb-6 p-4 rounded-b-3xl text-center">
              <span className="text-xs font-semibold text-[#a85243]">
                💡 0 DA pour les habitantes d’Azazga et communes voisines !
              </span>
            </div>
          </div>

          {/* Card 2: Yalidine Express */}
          <div className="bg-[#fdfaf8] rounded-3xl p-6 sm:p-8 border border-[#ecd0c7] shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#fceee9] border border-[#ecd0c7] flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#2e1a23]" />
                </div>
                <span className="bg-[#fceee9] text-[#a85243] text-xs font-bold px-3 py-1 rounded-full border border-[#f0ded8]">
                  58 Wilayas couvertes
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2e1a23]">
                  Livraison Yalidine Express
                </h3>
                <p className="text-xs text-[#785b65] font-semibold mt-0.5">
                  Stop-desk (Bureau) ou à Domicile
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#4a2835]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#a85243] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Couverture nationale :</strong>
                    <p className="text-[#694e57]">Alger, Oran, Constantine, Béjaïa, Sétif, Tizi Ouzou, Annaba, Blida, etc.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#a85243] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Délai d’acheminement :</strong>
                    <p className="text-[#694e57]">24h à 48h dès la fin de fabrication à l’atelier.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2e1a23]">Suivi & Paiement :</strong>
                    <p className="text-[#694e57]">Numéro de suivi Yalidine officiel transmis par WhatsApp. Règlement en espèces à la livraison.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f0ded8] bg-[#fcf3f0] -mx-6 -mb-6 p-4 rounded-b-3xl text-center">
              <span className="text-xs text-[#785b65]">
                Tarifs officiels calculés automatiquement selon la wilaya.
              </span>
            </div>
          </div>

        </div>

        {/* Interactive Yalidine Simulator */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#ecd0c7] shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0ded8]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2e1a23] text-white flex items-center justify-center">
                <Calculator className="w-4 h-4 text-[#e8a598]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#2e1a23]">
                  Simulateur des Tarifs Yalidine par Wilaya
                </h4>
                <p className="text-xs text-[#785b65]">
                  Choisissez votre wilaya pour connaître les frais exacts d'expédition.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-64">
              <select
                value={selectedWilayaCode}
                onChange={(e) => setSelectedWilayaCode(e.target.value)}
                aria-label="Sélectionner une wilaya pour simuler les tarifs"
                className="w-full p-2.5 bg-[#fdfaf8] text-xs font-semibold rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
              >
                {ALGERIA_WILAYAS.map((w) => (
                  <option key={w.code} value={w.code}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Azazga comparison */}
            <div className="bg-[#fceee9]/50 p-4 rounded-2xl border border-[#ecd0c7] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a85243]">Retrait à Azazga</span>
              <p className="font-serif text-xl font-bold text-[#2e1a23]">0 DA</p>
              <p className="text-[11px] text-[#785b65]">Boutique Boukersi (Azazga)</p>
            </div>

            {/* Yalidine Stop desk */}
            <div className="bg-[#fdfaf8] p-4 rounded-2xl border border-[#ecd0c7] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#785b65]">Bureau Yalidine (Stop-Desk)</span>
              <p className="font-serif text-xl font-bold text-[#2e1a23]">
                {selectedWilaya.yalidineBureauFeeDZD} <span className="text-xs font-sans text-[#a85243]">DA</span>
              </p>
              <p className="text-[11px] text-[#785b65]">{selectedWilaya.name}</p>
            </div>

            {/* Yalidine Home */}
            <div className="bg-[#fdfaf8] p-4 rounded-2xl border border-[#ecd0c7] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#785b65]">Livraison à Domicile</span>
              <p className="font-serif text-xl font-bold text-[#2e1a23]">
                {selectedWilaya.yalidineHomeFeeDZD} <span className="text-xs font-sans text-[#a85243]">DA</span>
              </p>
              <p className="text-[11px] text-[#785b65]">Directement à votre adresse</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
