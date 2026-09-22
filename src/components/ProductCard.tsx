import type { ProductItem } from '@/types';

export function ProductCard({ item }: { item: ProductItem }) {
  return (
    <div className="flex gap-3">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
        <p className="text-xs text-gray-500">{item.variant}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-400">Qty {item.quantity}</span>
          <span className="text-sm font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
