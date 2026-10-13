import React, { useState } from 'react';
import { NailMeasurements, PresetSize } from '../types';
import { PRESET_SIZES_VALUES } from '../data/algeria';
import { Ruler, Sparkles, Copy, Check, Info, AlertCircle } from 'lucide-react';

interface NailMeasurementFormProps {
  measurements: NailMeasurements;
  onChange: (updated: NailMeasurements) => void;
}

export const NailMeasurementForm: React.FC<NailMeasurementFormProps> = ({
  measurements,
  onChange,
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Apply a preset (XS, S, M, L)
  const applyPreset = (preset: PresetSize) => {
    if (preset === 'custom') {
      onChange({ ...measurements, presetSize: 'custom' });
      return;
    }

    const val = PRESET_SIZES_VALUES[preset];
    if (!val) return;

    onChange({
      ...measurements,
      presetSize: preset,
      leftThumb: val.thumb,
      leftIndex: val.index,
      leftMiddle: val.middle,
      leftRing: val.ring,
      leftPinky: val.pinky,
      rightThumb: val.thumb,
      rightIndex: val.index,
      rightMiddle: val.middle,
      rightRing: val.ring,
      rightPinky: val.pinky,
    });
  };

  // Adjust a specific finger with stepper (+ / -)
  const adjustFinger = (finger: keyof NailMeasurements, delta: number) => {
    const current = Number(measurements[finger]) || 12;
    const newVal = Math.max(7, Math.min(22, current + delta));
    onChange({
      ...measurements,
      presetSize: 'custom',
      [finger]: newVal,
    });
  };

  // Direct manual numeric change
  const handleInputChange = (finger: keyof NailMeasurements, val: string) => {
    const num = parseFloat(val);
    onChange({
      ...measurements,
      presetSize: 'custom',
      [finger]: isNaN(num) ? 12 : num,
    });
  };

  // Symmetrical copy from left hand to right hand
  const copyLeftToRight = () => {
    onChange({
      ...measurements,
      rightThumb: measurements.leftThumb,
      rightIndex: measurements.leftIndex,
      rightMiddle: measurements.leftMiddle,
      rightRing: measurements.leftRing,
      rightPinky: measurements.leftPinky,
    });
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const fingers: { keyLeft: keyof NailMeasurements; keyRight: keyof NailMeasurements; label: string; fingerNum: string; defaultAvg: number }[] = [
    { keyLeft: 'leftThumb', keyRight: 'rightThumb', label: 'Pouce', fingerNum: '1', defaultAvg: 16 },
    { keyLeft: 'leftIndex', keyRight: 'rightIndex', label: 'Index', fingerNum: '2', defaultAvg: 12 },
    { keyLeft: 'leftMiddle', keyRight: 'rightMiddle', label: 'Majeur', fingerNum: '3', defaultAvg: 13 },
    { keyLeft: 'leftRing', keyRight: 'rightRing', label: 'Annulaire', fingerNum: '4', defaultAvg: 11 },
    { keyLeft: 'leftPinky', keyRight: 'rightPinky', label: 'Auriculaire', fingerNum: '5', defaultAvg: 9 },
  ];

  return (
    <div className="space-y-6">
      {/* Header of measurement block */}
      <div className="bg-[#fceee9]/70 rounded-2xl p-4 sm:p-5 border border-[#ecd0c7] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#2e1a23] text-white flex items-center justify-center shrink-0">
              <Ruler className="w-5 h-5 text-[#e8a598]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2e1a23]">
                Mesures de vos 10 ongles (en millimètres)
              </h3>
              <p className="text-xs text-[#785b65]">
                Mesurez la largeur maximale de l'ongle à l'aide d'un morceau de scotch et d'une règle.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-[#a85243] bg-white px-2.5 py-1 rounded-full border border-[#f0ded8]">
              Précision artisanale au mm
            </span>
          </div>
        </div>

        {/* Quick Presets Buttons (XS, S, M, L) */}
        <div className="pt-2 border-t border-[#f0ded8]/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#2e1a23]">Tailles standards rapides :</span>
          {(['XS', 'S', 'M', 'L'] as PresetSize[]).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => applyPreset(size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                measurements.presetSize === size
                  ? 'bg-[#2e1a23] text-white shadow-xs'
                  : 'bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fceee9] border border-[#ecd0c7]'
              }`}
            >
              Taille {size}
            </button>
          ))}
          <button
            type="button"
            onClick={() => applyPreset('custom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              measurements.presetSize === 'custom'
                ? 'bg-[#a85243] text-white'
                : 'bg-[#fdfaf8] text-[#785b65] hover:bg-[#fceee9] border border-[#ecd0c7]'
            }`}
          >
            Sur mesure libre
          </button>
        </div>
      </div>

      {/* Copy left to right quick helper */}
      <div className="flex items-center justify-between bg-[#fcf3f0] px-4 py-2.5 rounded-xl border border-[#f0ded8]">
        <div className="flex items-center gap-2 text-xs text-[#694e57]">
          <Info className="w-4 h-4 text-[#a85243] shrink-0" />
          <span>Vos deux mains ont généralement les mêmes largeurs ?</span>
        </div>
        <button
          type="button"
          onClick={copyLeftToRight}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#fdfaf8] text-[#2e1a23] hover:bg-[#2e1a23] hover:text-white border border-[#ecd0c7] transition-all cursor-pointer shadow-2xs"
        >
          {copiedNotification ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Copié !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#a85243]" />
              <span className="hidden sm:inline">Copier Main Gauche ➔ Droite</span>
              <span className="sm:hidden">Copier G ➔ D</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of the 2 Hands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Main Gauche */}
        <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#f0ded8]">
            <h4 className="font-serif text-base font-bold text-[#2e1a23] flex items-center gap-1.5">
              <span>✋ Main Gauche</span>
            </h4>
            <span className="text-[11px] text-[#785b65]">5 ongles</span>
          </div>

          <div className="space-y-2.5">
            {fingers.map((f) => {
              const val = Number(measurements[f.keyLeft]) || f.defaultAvg;
              return (
                <div
                  key={f.keyLeft}
                  className="flex items-center justify-between bg-[#fcf3f0]/60 p-2.5 rounded-xl border border-[#f0ded8]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#fceee9] text-[#a85243] text-xs font-bold flex items-center justify-center">
                      {f.fingerNum}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[#2e1a23] block">{f.label}</span>
                      <span className="text-[10px] text-[#785b65]">Largeur en mm</span>
                    </div>
                  </div>

                  {/* Stepper with touch buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => adjustFinger(f.keyLeft, -1)}
                      className="w-8 h-8 rounded-lg bg-[#fdfaf8] border border-[#ecd0c7] text-[#2e1a23] font-bold text-sm hover:bg-[#fceee9] flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                    >
                      -
                    </button>
                    <div className="relative">
                      <input
                        type="number"
                        min="7"
                        max="22"
                        step="0.5"
                        value={val}
                        onChange={(e) => handleInputChange(f.keyLeft, e.target.value)}
                        className="w-14 text-center font-bold text-sm py-1 bg-white border border-[#ecd0c7] rounded-lg text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
                      />
                      <span className="absolute right-1 top-1.5 text-[9px] text-[#785b65] pointer-events-none">mm</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustFinger(f.keyLeft, 1)}
                      className="w-8 h-8 rounded-lg bg-[#fdfaf8] border border-[#ecd0c7] text-[#2e1a23] font-bold text-sm hover:bg-[#fceee9] flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Droite */}
        <div className="bg-[#fdfaf8] rounded-2xl border border-[#ecd0c7] p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#f0ded8]">
            <h4 className="font-serif text-base font-bold text-[#2e1a23] flex items-center gap-1.5">
              <span>🤚 Main Droite</span>
            </h4>
            <span className="text-[11px] text-[#785b65]">5 ongles</span>
          </div>

          <div className="space-y-2.5">
            {fingers.map((f) => {
              const val = Number(measurements[f.keyRight]) || f.defaultAvg;
              return (
                <div
                  key={f.keyRight}
                  className="flex items-center justify-between bg-[#fcf3f0]/60 p-2.5 rounded-xl border border-[#f0ded8]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#fceee9] text-[#a85243] text-xs font-bold flex items-center justify-center">
                      {f.fingerNum}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[#2e1a23] block">{f.label}</span>
                      <span className="text-[10px] text-[#785b65]">Largeur en mm</span>
                    </div>
                  </div>

                  {/* Stepper with touch buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => adjustFinger(f.keyRight, -1)}
                      className="w-8 h-8 rounded-lg bg-[#fdfaf8] border border-[#ecd0c7] text-[#2e1a23] font-bold text-sm hover:bg-[#fceee9] flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                    >
                      -
                    </button>
                    <div className="relative">
                      <input
                        type="number"
                        min="7"
                        max="22"
                        step="0.5"
                        value={val}
                        onChange={(e) => handleInputChange(f.keyRight, e.target.value)}
                        className="w-14 text-center font-bold text-sm py-1 bg-white border border-[#ecd0c7] rounded-lg text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
                      />
                      <span className="absolute right-1 top-1.5 text-[9px] text-[#785b65] pointer-events-none">mm</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustFinger(f.keyRight, 1)}
                      className="w-8 h-8 rounded-lg bg-[#fdfaf8] border border-[#ecd0c7] text-[#2e1a23] font-bold text-sm hover:bg-[#fceee9] flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Summary Recap Bar of all 10 fingers */}
      <div className="bg-[#2e1a23] text-[#f7d6cd] rounded-xl p-3 sm:p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <p className="font-semibold text-white">Récapitulatif des 10 largeurs enregistrées :</p>
          <p className="font-mono text-[11px] text-[#e8a598]">
            Gauche : [{measurements.leftThumb}, {measurements.leftIndex}, {measurements.leftMiddle}, {measurements.leftRing}, {measurements.leftPinky}] mm
            {' • '}
            Droite : [{measurements.rightThumb}, {measurements.rightIndex}, {measurements.rightMiddle}, {measurements.rightRing}, {measurements.rightPinky}] mm
          </p>
        </div>
        <div className="text-[11px] text-right text-[#fceee9]/80">
          Vérification personnalisée par Célia à l’atelier ✨
        </div>
      </div>
    </div>
  );
};
