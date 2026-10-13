import React, { useState } from 'react';
import { Order } from '../../types';
import { 
  NOTIFICATION_TEMPLATES, 
  NotificationType, 
  openWhatsAppNotification 
} from '../../services/notificationService';
import { 
  X, MessageCircle, Copy, Check, Bell, Sparkles, 
  Send, ShieldAlert, Store, Truck, Info, Heart 
} from 'lucide-react';

interface NotificationCenterModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  // Default notification suggestion according to order status
  const getInitialType = (): NotificationType => {
    if (order.status === 'to_confirm') return 'order_received';
    if (order.status === 'confirmed') return 'order_confirmed';
    if (order.status === 'ready' || order.status === 'shipped_or_pickup') {
      return order.deliveryMethod === 'boukersi_azazga' ? 'ready_pickup_boukersi' : 'shipped_yalidine';
    }
    if (order.status === 'completed') return 'order_completed';
    return 'order_confirmed';
  };

  const [selectedType, setSelectedType] = useState<NotificationType>(getInitialType());
  const [customizedText, setCustomizedText] = useState<string>(
    NOTIFICATION_TEMPLATES[getInitialType()].buildMessage(order)
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectTemplate = (type: NotificationType) => {
    setSelectedType(type);
    setCustomizedText(NOTIFICATION_TEMPLATES[type].buildMessage(order));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? `213${cleanPhone.slice(1)}` : `213${cleanPhone}`;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(customizedText)}`, '_blank');
  };

  const templateList: { id: NotificationType; icon: React.ReactNode }[] = [
    { id: 'order_received', icon: <Bell className="w-3.5 h-3.5" /> },
    { id: 'order_confirmed', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'ready_pickup_boukersi', icon: <Store className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'shipped_yalidine', icon: <Truck className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'missing_info', icon: <Info className="w-3.5 h-3.5 text-orange-500" /> },
    { id: 'order_completed', icon: <Heart className="w-3.5 h-3.5 text-rose-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-[#2e1a23]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fdfaf8] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#ecd0c7] shadow-2xl p-5 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#fdfaf8] text-[#2e1a23] hover:bg-[#fceee9] border border-[#f0ded8] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 pb-3 border-b border-[#f0ded8]">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2e1a23]">
              Centre de Notifications Client (WhatsApp)
            </h3>
            <p className="text-xs text-[#785b65]">
              Pour : <strong>{order.customer.fullName}</strong> ({order.customer.phone}) • Réf: {order.orderNumber}
            </p>
          </div>
        </div>

        {/* Template Selector Pills */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#785b65] uppercase tracking-wider block">
            Sélectionner un modèle de notification :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {templateList.map((tpl) => {
              const meta = NOTIFICATION_TEMPLATES[tpl.id];
              const isSelected = selectedType === tpl.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2e1a23] bg-[#fceee9] text-[#2e1a23] font-bold shadow-xs'
                      : 'border-[#ecd0c7] bg-white text-[#4a2835] hover:bg-[#fcf3f0]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {tpl.icon}
                    <span className="text-[10px] font-bold uppercase">{meta.badge}</span>
                  </div>
                  <span className="text-[11px] line-clamp-1 leading-snug font-semibold">{meta.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Editor / Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#2e1a23]">
              Aperçu et personnalisation du message :
            </label>
            <span className="text-[10px] text-[#785b65]">Modifiable avant envoi</span>
          </div>

          <textarea
            rows={8}
            value={customizedText}
            onChange={(e) => setCustomizedText(e.target.value)}
            className="w-full p-3.5 bg-white rounded-2xl border border-[#ecd0c7] text-xs font-mono text-[#2e1a23] leading-relaxed focus:outline-none focus:border-[#a85243] shadow-inner"
          />
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#f0ded8]">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-[#4a2835] hover:bg-[#fceee9] border border-[#ecd0c7] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#a85243]" />}
            <span>{copied ? 'Message copié !' : 'Copier le texte'}</span>
          </button>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Envoyer sur WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
