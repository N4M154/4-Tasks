import { useState } from 'react';
import {
  ChevronLeft,
  Package,
  Truck,
  Clock,
  AlertTriangle,
  MapPin,
  HeadphonesIcon,
  ChevronRight,
  Search,
  RefreshCw,
  Home,
  CheckCircle2,
  Info,
} from 'lucide-react';
import type { OrderData } from '@/types';
import { Timeline } from './Timeline';
import { ProductCard } from './ProductCard';
import { BottomSheet } from './BottomSheet';
import { SupportSheet } from './SupportSheet';
import { ReportIssueSheet } from './ReportIssueSheet';
import { OrderDetailsSheet } from './OrderDetailsSheet';

interface OrderTrackingProps {
  order: OrderData;
}

type SheetType = 'support' | 'report' | 'details' | null;

export function OrderTracking({ order }: OrderTrackingProps) {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [reportedMissing, setReportedMissing] = useState(order.reportedMissing ?? false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const scenario = order.scenario;

  const accentColor =
    scenario === 'delayed'
      ? 'amber'
      : scenario === 'delivered_not_received'
        ? 'rose'
        : scenario === 'tracking_unavailable'
          ? 'slate'
          : 'emerald';

  const currentStep = order.steps.find((s) => s.status === 'current');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-base font-bold text-gray-900">Track Order</h1>
          <button
            onClick={handleRefresh}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Refresh"
          >
            <RefreshCw
              size={18}
              className={refreshing ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[430px] px-4 pb-32 pt-4">
        {/* Status Banner */}
        <StatusBanner
          scenario={scenario}
          accentColor={accentColor}
          estimatedDelivery={order.estimatedDelivery}
          delayReason={order.delayReason}
          reportedMissing={reportedMissing}
        />

        {/* Tracking Number / Carrier Card */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Carrier</p>
              <p className="text-sm font-semibold text-gray-900">{order.carrier}</p>
            </div>
          </div>
          {order.trackingNumber ? (
            <div className="text-right">
              <p className="text-xs text-gray-400">Tracking #</p>
              <p className="text-sm font-medium text-gray-700">
                {order.trackingNumber}
              </p>
            </div>
          ) : (
            <div className="text-right">
              <p className="text-xs text-gray-400">Tracking #</p>
              <p className="text-sm font-medium text-gray-400">Pending</p>
            </div>
          )}
        </div>

        {/* Timeline / Progress */}
        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Delivery Progress</h2>
            {currentStep && (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium bg-${accentColor}-50 text-${accentColor}-700`}
              >
                {currentStep.label}
              </span>
            )}
          </div>
          {scenario === 'tracking_unavailable' ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Info size={26} className="text-slate-500" />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900">
                Tracking details coming soon
              </p>
              <p className="mt-1 max-w-[260px] text-sm text-gray-500">
                Your order is confirmed and being prepared. Once the carrier picks
                it up, you'll see live tracking here.
              </p>
            </div>
          ) : (
            <Timeline steps={order.steps} accentColor={accentColor} />
          )}
        </div>

        {/* Order Summary */}
        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Order Summary</h2>
            <button
              onClick={() => setActiveSheet('details')}
              className="flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              View details
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {order.items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-sm text-gray-500">Order total</span>
            <span className="text-base font-bold text-gray-900">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <MapPin size={20} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Delivery address</p>
            <p className="mt-0.5 whitespace-pre-line text-sm font-medium text-gray-700">
              {order.shippingAddress}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-3">
          {scenario === 'delayed' && (
            <button
              onClick={() => setActiveSheet('report')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-[0.98]"
            >
              <AlertTriangle size={18} />
              Report a delivery issue
            </button>
          )}

          {scenario === 'delivered_not_received' && !reportedMissing && (
            <button
              onClick={() => setActiveSheet('report')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 py-3.5 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition-all hover:bg-rose-600 active:scale-[0.98]"
            >
              <AlertTriangle size={18} />
              I didn't receive this
            </button>
          )}

          {scenario === 'delivered_not_received' && reportedMissing && (
            <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-4">
              <CheckCircle2 size={20} className="shrink-0 text-rose-600" />
              <div>
                <p className="text-sm font-semibold text-rose-900">
                  Issue reported
                </p>
                <p className="text-xs text-rose-700">
                  We're investigating and will contact you within 24 hours.
                </p>
              </div>
            </div>
          )}

          {scenario === 'tracking_unavailable' && (
            <button
              onClick={handleRefresh}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-900 active:scale-[0.98]"
            >
              <Search size={18} />
              Check for tracking update
            </button>
          )}

          <button
            onClick={() => setActiveSheet('support')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            <HeadphonesIcon size={18} />
            Contact support
          </button>
        </div>
      </div>

      {/* Bottom Sheets */}
      <BottomSheet
        open={activeSheet === 'support'}
        onClose={() => setActiveSheet(null)}
        title="Contact Support"
      >
        <SupportSheet onClose={() => setActiveSheet(null)} />
      </BottomSheet>

      <BottomSheet
        open={activeSheet === 'report'}
        onClose={() => setActiveSheet(null)}
        title={
          scenario === 'delivered_not_received'
            ? 'Report Missing Package'
            : 'Report Delivery Issue'
        }
      >
        <ReportIssueSheet
          orderId={order.orderId}
          issueType={scenario === 'delivered_not_received' ? 'delivered_not_received' : 'delayed'}
          onClose={() => setActiveSheet(null)}
          onReported={() => setReportedMissing(true)}
        />
      </BottomSheet>

      <BottomSheet
        open={activeSheet === 'details'}
        onClose={() => setActiveSheet(null)}
        title="Order Details"
      >
        <OrderDetailsSheet order={order} />
      </BottomSheet>
    </div>
  );
}

/* ---------- Status Banner ---------- */

interface StatusBannerProps {
  scenario: OrderData['scenario'];
  accentColor: string;
  estimatedDelivery: string | null;
  delayReason?: string;
  reportedMissing: boolean;
}

function StatusBanner({
  scenario,
  accentColor,
  estimatedDelivery,
  delayReason,
  reportedMissing,
}: StatusBannerProps) {
  if (scenario === 'in_transit') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-500/20">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -right-2 top-8 h-16 w-16 rounded-full bg-white/10" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <Truck size={18} />
            <span className="text-sm font-semibold">Out for Delivery</span>
          </div>
          <p className="mt-2 text-2xl font-bold leading-tight">
            Arriving {estimatedDelivery}
          </p>
          <p className="mt-1 text-sm text-emerald-50">
            Your package is on the truck and heading your way.
          </p>
        </div>
      </div>
    );
  }

  if (scenario === 'delayed') {
    return (
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg shadow-amber-500/20">
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span className="text-sm font-semibold">Delivery Delayed</span>
        </div>
        <p className="mt-2 text-xl font-bold leading-tight">{estimatedDelivery}</p>
        {delayReason && (
          <p className="mt-2 text-sm text-amber-50">{delayReason}</p>
        )}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          <Info size={12} />
          We apologize for the inconvenience
        </div>
      </div>
    );
  }

  if (scenario === 'delivered_not_received') {
    return (
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 p-5 text-white shadow-lg shadow-rose-500/20">
        <div className="flex items-center gap-2">
          <Home size={18} />
          <span className="text-sm font-semibold">
            {reportedMissing ? 'Investigation In Progress' : 'Marked Delivered'}
          </span>
        </div>
        <p className="mt-2 text-xl font-bold leading-tight">
          {reportedMissing
            ? "We're looking into your order"
            : "Did you receive your package?"}
        </p>
        <p className="mt-2 text-sm text-rose-50">
          {reportedMissing
            ? `Reported on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}. Our team is investigating with the carrier and will reach out within 24 hours.`
            : `The carrier marked this as delivered on ${estimatedDelivery?.replace('Marked delivered ', '')}, but we want to make sure you actually got it.`}
        </p>
        {!reportedMissing && (
          <p className="mt-3 text-sm font-medium text-rose-50">
            Tap "I didn't receive this" below to report it.
          </p>
        )}
      </div>
    );
  }

  // tracking_unavailable
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-5 text-white shadow-lg">
      <div className="flex items-center gap-2">
        <Package size={18} />
        <span className="text-sm font-semibold">Order Confirmed</span>
      </div>
      <p className="mt-2 text-xl font-bold leading-tight">
        {estimatedDelivery}
      </p>
      <p className="mt-2 text-sm text-slate-300">
        Your order is being prepared at our fulfillment center. Tracking will
        become available once the carrier picks it up.
      </p>
    </div>
  );
}
