import { Check, Dot, Truck, Package, Home, Clock } from 'lucide-react';
import type { TrackingStep } from '@/types';

const iconMap: Record<string, typeof Check> = {
  confirmed: Check,
  processing: Package,
  shipped: Truck,
  out_for_delivery: Truck,
  delivered: Home,
};

interface TimelineProps {
  steps: TrackingStep[];
  accentColor?: string;
}

export function Timeline({ steps, accentColor = 'emerald' }: TimelineProps) {
  return (
    <div className="relative">
      {steps.map((step, index) => {
        const Icon = iconMap[step.key] ?? Dot;
        const isLast = index === steps.length - 1;
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <div key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <div
                className={`absolute left-[18px] top-9 bottom-0 w-0.5 ${
                  isCompleted ? `bg-${accentColor}-500` : 'bg-gray-200'
                }`}
                style={{ height: 'calc(100% - 36px)' }}
              />
            )}
            <div
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                isCompleted
                  ? `bg-${accentColor}-500 text-white shadow-md shadow-${accentColor}-500/30`
                  : isCurrent
                    ? `bg-${accentColor}-50 text-${accentColor}-600 ring-2 ring-${accentColor}-500 ring-offset-2`
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isCompleted ? (
                <Check size={18} strokeWidth={3} />
              ) : isCurrent ? (
                <span className="absolute h-3 w-3 rounded-full bg-current animate-ping opacity-75" />
              ) : null}
              <Icon size={18} className={isCurrent ? 'relative z-10' : ''} />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-3">
                <p
                  className={`text-sm font-semibold ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
                {step.timestamp && (
                  <span
                    className={`shrink-0 text-xs ${
                      isCurrent ? `text-${accentColor}-600 font-medium` : 'text-gray-400'
                    }`}
                  >
                    {step.timestamp}
                  </span>
                )}
              </div>
              <p
                className={`mt-0.5 text-sm ${
                  isCompleted || isCurrent ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {step.description}
              </p>
              {isCurrent && !step.timestamp && (
                <p className={`mt-1 flex items-center gap-1 text-xs text-${accentColor}-600`}>
                  <Clock size={12} /> In progress
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
