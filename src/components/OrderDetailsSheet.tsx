import type { OrderData } from '@/types';
import { ProductCard } from './ProductCard';

interface OrderDetailsSheetProps {
  order: OrderData;
}

export function OrderDetailsSheet({ order }: OrderDetailsSheetProps) {
  const rows = [
    { label: 'Subtotal', value: `$${order.subtotal.toFixed(2)}` },
    {
      label: 'Shipping',
      value: order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`,
    },
    { label: 'Tax', value: `$${order.tax.toFixed(2)}` },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Order Number
          </span>
          <span className="text-sm font-bold text-gray-900">{order.orderId}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Placed On
          </span>
          <span className="text-sm font-medium text-gray-700">{order.placedDate}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Carrier
          </span>
          <span className="text-sm font-medium text-gray-700">{order.carrier}</span>
        </div>
        {order.trackingNumber && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Tracking
            </span>
            <span className="text-sm font-medium text-gray-700">
              {order.trackingNumber}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-bold text-gray-900">
          Items ({order.items.length})
        </h3>
        <div className="mt-3 space-y-4">
          {order.items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-gray-100 p-4">
        <h3 className="text-sm font-bold text-gray-900">Payment Summary</h3>
        <div className="mt-3 space-y-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{row.label}</span>
              <span className="text-sm font-medium text-gray-700">{row.value}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900">Total</span>
              <span className="text-base font-bold text-gray-900">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-bold text-gray-900">Shipping Address</h3>
        <p className="mt-2 whitespace-pre-line text-sm text-gray-500">
          {order.shippingAddress}
        </p>
      </div>
    </div>
  );
}
