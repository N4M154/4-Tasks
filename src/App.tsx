import { useState } from 'react';
import { Truck, Clock, Home, Package } from 'lucide-react';
import { orders } from './data';
import type { OrderScenario } from './types';
import { OrderTracking } from './components/OrderTracking';

const scenarios: {
  key: OrderScenario;
  label: string;
  icon: typeof Truck;
}[] = [
  { key: 'in_transit', label: 'In Transit', icon: Truck },
  { key: 'delayed', label: 'Delayed', icon: Clock },
  { key: 'delivered_not_received', label: 'Not Received', icon: Home },
  { key: 'tracking_unavailable', label: 'No Tracking', icon: Package },
];

function App() {
  const [scenario, setScenario] = useState<OrderScenario>('in_transit');
  const order = orders[scenario];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Scenario switcher — desktop only, lets you preview all 4 states */}
      <div className="sticky top-0 z-40 hidden border-b border-gray-200 bg-white/95 backdrop-blur sm:block">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
          <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Preview:
          </span>
          {scenarios.map((s) => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                scenario === s.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <s.icon size={14} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile scenario switcher — horizontal scroll */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur sm:hidden">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 py-3">
          {scenarios.map((s) => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                scenario === s.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <s.icon size={14} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phone frame on desktop, full screen on mobile */}
      <div className="flex justify-center py-0 sm:py-8">
        <div className="w-full max-w-[430px] overflow-hidden bg-gray-50 shadow-2xl sm:rounded-[2.5rem] sm:border-[10px] sm:border-gray-900">
          <OrderTracking order={order} />
        </div>
      </div>
    </div>
  );
}

export default App;
