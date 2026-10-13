import React, { useState, useMemo, useEffect } from 'react';
import { Order, OrderStatus } from '../../types';
import { getStoredOrders, saveOrder } from '../../services/orderStorage';
import { OrderDetailSheetModal } from './OrderDetailSheetModal';
import { ManualOrderModal } from './ManualOrderModal';
import { 
  Plus, Search, Filter, Calendar, Clock, AlertTriangle, 
  CheckCircle2, Store, Truck, Ruler, MessageCircle, LogOut, 
  Eye, Sparkles, TrendingUp, Package, ShieldCheck
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToShop: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onBackToShop,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isManualOrderModalOpen, setIsManualOrderModalOpen] = useState(false);

  // Load orders from storage
  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchStatus = activeStatusFilter === 'all' || ord.status === activeStatusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customer.fullName.toLowerCase().includes(q) ||
        ord.customer.phone.includes(q) ||
        ord.customer.wilayaName.toLowerCase().includes(q) ||
        ord.item.productName.toLowerCase().includes(q);

      return matchStatus && matchSearch;
    });
  }, [orders, activeStatusFilter, searchQuery]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalCount = orders.length;
    const toConfirmCount = orders.filter((o) => o.status === 'to_confirm').length;
    const inProductionCount = orders.filter((o) => o.status === 'in_production').length;
    const readyCount = orders.filter((o) => o.status === 'ready' || o.status === 'shipped_or_pickup').length;
    const urgentCount = orders.filter((o) => o.isUrgent && o.status !== 'completed').length;
    const totalRevenueDZD = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.confirmedPriceDZD || o.estimatedPriceDZD), 0);

    return {
      totalCount,
      toConfirmCount,
      inProductionCount,
      readyCount,
      urgentCount,
      totalRevenueDZD,
    };
  }, [orders]);

  // Calendar grouping by promised date
  const ordersByDate = useMemo(() => {
    const groups: Record<string, Order[]> = {};
    orders
      .filter((o) => o.status !== 'completed' && o.status !== 'cancelled')
      .forEach((o) => {
        const dateKey = o.confirmedPromiseDate || o.estimatedCompletionDate || 'Non définie';
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(o);
      });
    return groups;
  }, [orders]);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleManualOrderSaved = (newOrder: Order) => {
    saveOrder(newOrder);
    loadOrders();
  };

  return (
    <div className="min-h-screen bg-[#fdfaf8] pb-16">
      
      {/* Top Admin Header Bar */}
      <div className="bg-[#2e1a23] text-white border-b border-[#4a2835] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8a598] text-[#2e1a23] flex items-center justify-center font-bold font-serif text-base shadow-xs">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                  SB Renails • Tableau de Bord Atelier
                </h1>
                <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700">
                  En ligne
                </span>
              </div>
              <p className="text-xs text-[#fceee9]/70">
                Gestion des commandes, des 10 mesures et des expéditions Azazga & Yalidine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsManualOrderModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#e8a598] text-[#2e1a23] hover:bg-white transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nouvelle Commande (WhatsApp / Direct)</span>
            </button>

            <button
              onClick={onBackToShop}
              className="px-3 py-2 rounded-xl text-xs font-medium text-[#fceee9]/80 hover:text-white hover:bg-[#4a2835] transition-colors cursor-pointer"
            >
              Voir la boutique
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-[#fceee9]/80 hover:text-white hover:bg-[#4a2835] transition-colors cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Statistics Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#785b65]">Total Commandes</span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl font-bold text-[#2e1a23]">{stats.totalCount}</span>
              <Package className="w-4 h-4 text-[#a85243]" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">À Confirmer</span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl font-bold text-amber-800">{stats.toConfirmCount}</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">En Préparation</span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl font-bold text-purple-800">{stats.inProductionCount}</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">Commandes Urgentes</span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl font-bold text-rose-800">{stats.urgentCount}</span>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-[#2e1a23] text-white p-4 rounded-2xl shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8a598]">Chiffre d'Affaires</span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white">
                {stats.totalRevenueDZD.toLocaleString('fr-FR')} <span className="text-xs font-sans text-[#e8a598]">DA</span>
              </span>
              <TrendingUp className="w-4 h-4 text-[#e8a598]" />
            </div>
          </div>

        </div>

        {/* Action, Search and Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#ecd0c7] shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#785b65] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par cliente, téléphone, n° commande (CN-...), wilaya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#fdfaf8] text-xs rounded-xl border border-[#ecd0c7] text-[#2e1a23] focus:outline-none focus:border-[#a85243]"
              />
            </div>

            {/* View switcher (List vs Calendar) */}
            <div className="flex items-center gap-1 bg-[#fcf3f0] p-1 rounded-xl border border-[#f0ded8]">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#2e1a23] shadow-xs'
                    : 'text-[#785b65] hover:text-[#2e1a23]'
                }`}
              >
                Liste ({filteredOrders.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  viewMode === 'calendar'
                    ? 'bg-white text-[#2e1a23] shadow-xs'
                    : 'text-[#785b65] hover:text-[#2e1a23]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Calendrier de charge</span>
              </button>
            </div>

          </div>

          {/* Status Tabs Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'Toutes les commandes' },
              { id: 'to_confirm', label: `À confirmer (${orders.filter(o => o.status === 'to_confirm').length})` },
              { id: 'in_production', label: `En préparation (${orders.filter(o => o.status === 'in_production').length})` },
              { id: 'ready', label: `Prêtes (${orders.filter(o => o.status === 'ready').length})` },
              { id: 'shipped_or_pickup', label: `À retirer / Expédiées (${orders.filter(o => o.status === 'shipped_or_pickup').length})` },
              { id: 'completed', label: 'Terminées' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-semibold ${
                  activeStatusFilter === tab.id
                    ? 'bg-[#2e1a23] text-white'
                    : 'bg-[#fdfaf8] text-[#4a2835] hover:bg-[#fceee9] border border-[#ecd0c7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode 1: Table / List */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-3xl border border-[#ecd0c7] shadow-sm overflow-hidden">
            {filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-[#2e1a23]">
                  <thead className="bg-[#fceee9] text-[#785b65] uppercase text-[10px] font-semibold border-b border-[#f0ded8]">
                    <tr>
                      <th className="py-3 px-4">Commande</th>
                      <th className="py-3 px-4">Cliente & Contact</th>
                      <th className="py-3 px-4">Modèle & Tailles</th>
                      <th className="py-3 px-4">Mode Remise</th>
                      <th className="py-3 px-4">Prix (DA)</th>
                      <th className="py-3 px-4">Échéance</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0ded8]">
                    {filteredOrders.map((ord) => {
                      const isBoukersi = ord.deliveryMethod === 'boukersi_azazga';
                      return (
                        <tr key={ord.id} className="hover:bg-[#fcf3f0]/60 transition-colors">
                          {/* Order Number & Urgency */}
                          <td className="py-3.5 px-4 font-mono font-bold whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span>{ord.orderNumber}</span>
                              {ord.isUrgent && (
                                <span className="bg-rose-100 text-rose-800 text-[9px] font-sans font-bold px-1.5 py-0.5 rounded">
                                  URGENT
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#785b65] block font-sans font-normal">
                              {new Date(ord.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </td>

                          {/* Customer Name & Phone */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold block text-[#2e1a23]">{ord.customer.fullName}</span>
                            <span className="text-[11px] text-[#785b65] font-mono">{ord.customer.phone}</span>
                          </td>

                          {/* Item & Measurements */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="font-semibold block truncate">{ord.item.productName}</span>
                            <span className="text-[10px] text-[#785b65] block">
                              {ord.item.shape} • {ord.item.length} • {ord.item.finish}
                            </span>
                            <span className="text-[10px] text-[#a85243] font-mono block">
                              Mesures G: [{ord.measurements.leftThumb}-{ord.measurements.leftIndex}-{ord.measurements.leftMiddle}-{ord.measurements.leftRing}-{ord.measurements.leftPinky}]
                            </span>
                          </td>

                          {/* Handover Method */}
                          <td className="py-3.5 px-4">
                            {isBoukersi ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                <Store className="w-3 h-3" />
                                Retrait Azazga
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                                <Truck className="w-3 h-3" />
                                Yalidine ({ord.customer.wilayaName.split(' - ')[1] || ord.customer.wilayaName})
                              </span>
                            )}
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-bold whitespace-nowrap">
                            {(ord.confirmedPriceDZD || ord.estimatedPriceDZD).toLocaleString('fr-FR')} DA
                            {!ord.isPriceConfirmed && (
                              <span className="text-[9px] text-amber-700 block font-normal">(À valider)</span>
                            )}
                          </td>

                          {/* Deadline */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-semibold block">
                              {ord.confirmedPromiseDate || ord.estimatedCompletionDate || '—'}
                            </span>
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fceee9] text-[#a85243]">
                              {ord.status === 'to_confirm' && 'À confirmer'}
                              {ord.status === 'pending_info' && 'Attente infos'}
                              {ord.status === 'confirmed' && 'Confirmée'}
                              {ord.status === 'in_production' && 'En préparation'}
                              {ord.status === 'ready' && 'Prête'}
                              {ord.status === 'shipped_or_pickup' && (isBoukersi ? 'Au retrait' : 'Expédiée')}
                              {ord.status === 'completed' && 'Terminée'}
                              {ord.status === 'cancelled' && 'Annulée'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenDetail(ord)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#2e1a23] text-white hover:bg-[#a85243] transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Fiche</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-[#785b65] space-y-2">
                <p className="font-serif text-base font-bold text-[#2e1a23]">Aucune commande trouvée</p>
                <p>Aucune commande ne correspond aux filtres ou à la recherche.</p>
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Calendar of Workload */}
        {viewMode === 'calendar' && (
          <div className="space-y-4">
            <div className="bg-[#fceee9] p-4 rounded-2xl border border-[#ecd0c7] text-xs text-[#4a2835] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#a85243]" />
                <span>
                  <strong>Calendrier de fabrication :</strong> visualisez les sets à réaliser selon la date promise pour anticiper votre temps de pose.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(ordersByDate).sort().map((dateStr) => {
                const dayOrders = ordersByDate[dateStr];
                return (
                  <div key={dateStr} className="bg-white rounded-2xl border border-[#ecd0c7] p-4 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#f0ded8]">
                      <span className="font-serif font-bold text-sm text-[#2e1a23]">
                        {dateStr}
                      </span>
                      <span className="text-[10px] font-bold bg-[#fceee9] text-[#a85243] px-2 py-0.5 rounded-full">
                        {dayOrders.length} set{dayOrders.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {dayOrders.map((ord) => (
                        <div
                          key={ord.id}
                          onClick={() => handleOpenDetail(ord)}
                          className="p-2.5 rounded-xl border border-[#ecd0c7] hover:border-[#a85243] bg-[#fdfaf8] cursor-pointer transition-all space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs">{ord.orderNumber}</span>
                            {ord.isUrgent && (
                              <span className="text-[9px] font-bold bg-rose-100 text-rose-800 px-1 rounded">
                                URGENT
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-xs text-[#2e1a23]">{ord.customer.fullName}</p>
                          <p className="text-[10px] text-[#785b65]">{ord.item.productName} ({ord.item.shape})</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Modal 1: Detail sheet */}
      <OrderDetailSheetModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedOrder(null);
        }}
        onOrderUpdated={loadOrders}
      />

      {/* Modal 2: Manual order creation */}
      <ManualOrderModal
        isOpen={isManualOrderModalOpen}
        onClose={() => setIsManualOrderModalOpen(false)}
        onOrderSaved={handleManualOrderSaved}
      />

    </div>
  );
};
