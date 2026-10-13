import React, { useState } from 'react';
import { OrderItem, NailMeasurements, CustomerInfo, DeliveryMethod, Order } from '../types';
import { CustomizerForm } from './CustomizerForm';
import { NailMeasurementForm } from './NailMeasurementForm';
import { CheckoutForm } from './CheckoutForm';
import { ALGERIA_WILAYAS, PRESET_SIZES_VALUES } from '../data/algeria';
import { Palette, Ruler, MapPin, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface OrderWizardProps {
  initialItem?: Partial<OrderItem>;
  onOrderCreated: (order: Order) => void;
  onCancel: () => void;
}

export const OrderWizard: React.FC<OrderWizardProps> = ({
  initialItem,
  onOrderCreated,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 1. Order Item state
  const [orderItem, setOrderItem] = useState<OrderItem>({
    productId: initialItem?.productId || 'baby-boomer-perle',
    productName: initialItem?.productName || 'Baby Boomer Nacre & Perle',
    isCustomCreation: initialItem?.isCustomCreation || false,
    shape: initialItem?.shape || 'Amande',
    length: initialItem?.length || 'Moyen',
    finish: initialItem?.finish || 'Brillant',
    extraDecors: initialItem?.extraDecors || [],
    customDescription: initialItem?.customDescription || '',
    unitPriceDZD: initialItem?.unitPriceDZD || 2600,
  });

  // 2. Nail measurements state (default to standard size S)
  const defaultSize = PRESET_SIZES_VALUES['S'];
  const [measurements, setMeasurements] = useState<NailMeasurements>({
    presetSize: 'S',
    leftThumb: defaultSize.thumb,
    leftIndex: defaultSize.index,
    leftMiddle: defaultSize.middle,
    leftRing: defaultSize.ring,
    leftPinky: defaultSize.pinky,
    rightThumb: defaultSize.thumb,
    rightIndex: defaultSize.index,
    rightMiddle: defaultSize.middle,
    rightRing: defaultSize.ring,
    rightPinky: defaultSize.pinky,
  });

  // 3. Customer Info state
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    wilayaCode: '15', // Tizi Ouzou by default
    wilayaName: '15 - Tizi Ouzou',
    commune: 'Azazga',
    addressNotes: '',
    yalidineBureau: '',
  });

  // 4. Delivery & deadlines state
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('boukersi_azazga');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [clientRequestedDate, setClientRequestedDate] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');

  // Submit complete order
  const handleFinalSubmit = () => {
    // Generate order number with random suffix CN-2026-XXX
    const randomNum = Math.floor(100 + Math.random() * 900);
    const orderNumber = `CN-2026-${randomNum}`;

    // Calculate shipping fee
    let shippingFee = 0;
    if (deliveryMethod !== 'boukersi_azazga') {
      const wilaya = ALGERIA_WILAYAS.find((w) => w.code === customer.wilayaCode) || ALGERIA_WILAYAS[14];
      shippingFee = deliveryMethod === 'yalidine_stopdesk' ? wilaya.yalidineBureauFeeDZD : wilaya.yalidineHomeFeeDZD;
    }

    // Calculate item total
    let itemPrice = orderItem.unitPriceDZD || 2600;
    if (orderItem.finish === 'Poudré Chrome' || orderItem.finish === 'Nacre') itemPrice += 200;
    if (orderItem.extraDecors.includes('strass')) itemPrice += 300;
    if (orderItem.extraDecors.includes('gold_leaf')) itemPrice += 200;
    if (orderItem.extraDecors.includes('nail_art')) itemPrice += 400;
    if (orderItem.extraDecors.includes('charms_3d')) itemPrice += 300;

    const urgentFee = isUrgent ? 500 : 0;
    const totalDZD = itemPrice + shippingFee + urgentFee;

    // Estimate completion date (3 to 5 days)
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + (isUrgent ? 2 : 4));

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'to_confirm',
      customer,
      deliveryMethod,
      shippingFeeDZD: shippingFee,
      item: {
        ...orderItem,
        unitPriceDZD: itemPrice,
      },
      measurements,
      estimatedPriceDZD: totalDZD,
      isPriceConfirmed: false,
      isUrgent,
      clientRequestedDate: clientRequestedDate || undefined,
      estimatedCompletionDate: completionDate.toISOString().split('T')[0],
      clientNotes: clientNotes || undefined,
    };

    onOrderCreated(newOrder);
  };

  const steps = [
    { num: 1, title: 'Modèle & Style', icon: <Palette className="w-4 h-4" /> },
    { num: 2, title: 'Mesures (mm)', icon: <Ruler className="w-4 h-4" /> },
    { num: 3, title: 'Livraison & Contact', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Breadcrumb / Stepper Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          {/* Connector line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#f0ded8] -translate-y-1/2 -z-10" />

          {steps.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  // Only allow clicking back to already visited steps
                  if (s.num <= currentStep) setCurrentStep(s.num);
                }}
                className={`flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer ${
                  s.num <= currentStep ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all shadow-xs ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#2e1a23] text-white ring-4 ring-[#fceee9]'
                      : 'bg-[#fdfaf8] text-[#785b65] border border-[#ecd0c7]'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
                    isCurrent ? 'text-[#a85243]' : 'text-[#785b65]'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-[#fdfaf8] rounded-3xl border border-[#ecd0c7] p-5 sm:p-8 shadow-md">
        
        {/* Step 1: Modèle & Style */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#a85243]">
                Étape 1 sur 3
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e1a23]">
                Personnalisez votre set de Press-on Nails
              </h2>
              <p className="text-xs text-[#785b65]">
                Choisissez la forme et la longueur idéales selon votre morphologie.
              </p>
            </div>

            <CustomizerForm
              item={orderItem}
              onChange={setOrderItem}
            />

            <div className="pt-4 border-t border-[#f0ded8] flex items-center justify-between">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#785b65] hover:text-[#2e1a23] hover:bg-[#fcf3f0] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(2);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-all cursor-pointer shadow-md"
              >
                <span>Continuer vers les 10 mesures</span>
                <ArrowRight className="w-4 h-4 text-[#e8a598]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Mesures des 10 Ongles */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#a85243]">
                Étape 2 sur 3
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e1a23]">
                Saisie précise de vos 10 ongles (en mm)
              </h2>
              <p className="text-xs text-[#785b65]">
                Ces mesures garantissent que chaque capsule épousera exactement vos ongles naturels sans douleur ni décollement.
              </p>
            </div>

            <NailMeasurementForm
              measurements={measurements}
              onChange={setMeasurements}
            />

            <div className="pt-4 border-t border-[#f0ded8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-[#4a2835] hover:bg-[#fcf3f0] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au modèle</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(3);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-all cursor-pointer shadow-md"
              >
                <span>Continuer vers la livraison</span>
                <ArrowRight className="w-4 h-4 text-[#e8a598]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Livraison, Coordonnées & Validation */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#a85243]">
                Étape 3 sur 3
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e1a23]">
                Coordonnées & Choix de Remise
              </h2>
              <p className="text-xs text-[#785b65]">
                Retrait gratuit à Azazga chez Boukersi ou expédition sécurisée avec Yalidine Express.
              </p>
            </div>

            <CheckoutForm
              customer={customer}
              deliveryMethod={deliveryMethod}
              isUrgent={isUrgent}
              clientRequestedDate={clientRequestedDate}
              clientNotes={clientNotes}
              item={orderItem}
              onCustomerChange={setCustomer}
              onDeliveryMethodChange={setDeliveryMethod}
              onUrgentChange={setIsUrgent}
              onClientRequestedDateChange={setClientRequestedDate}
              onClientNotesChange={setClientNotes}
              onSubmitOrder={handleFinalSubmit}
            />

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(2);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[#785b65] hover:text-[#2e1a23] hover:bg-[#fcf3f0] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Modifier mes mesures</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
