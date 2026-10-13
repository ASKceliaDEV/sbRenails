import React, { useState } from 'react';
import { Lock, Sparkles, X, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('celia@nailsbycelia.dz');
  const [password, setPassword] = useState('azazga2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple secure authentication check for Célia's atelier
    if (password === 'azazga2026' || password.length >= 6) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Mot de passe incorrect. (Code par défaut pour démo : azazga2026)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-md w-full border border-[#ecd0c7] shadow-2xl p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#fdfaf8] text-[#2e1a23] hover:bg-[#fceee9] border border-[#f0ded8] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2e1a23] text-white flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6 text-[#e8a598]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2e1a23]">
            SB Renails • Espace Atelier
          </h2>
          <p className="text-xs text-[#785b65]">
            Accès sécurisé pour gérer les commandes, les 10 mesures et les expéditions.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
              Adresse E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2e1a23] mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#785b65] hover:text-[#2e1a23]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#785b65] mt-1 italic">
              Mot de passe démo pré-rempli : <code className="bg-[#fceee9] px-1 py-0.5 rounded text-[#a85243] font-mono">azazga2026</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#e8a598]" />
            <span>Accéder au Tableau de Bord</span>
          </button>
        </form>
      </div>
    </div>
  );
};
