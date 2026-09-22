export type TrackingStepStatus = 'completed' | 'current' | 'upcoming';

export interface TrackingStep {
  key: string;
  label: string;
  description: string;
  timestamp: string | null;
  status: TrackingStepStatus;
}

export interface ProductItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderScenario =
  | 'in_transit'
  | 'delayed'
  | 'delivered_not_received'
  | 'tracking_unavailable';

export interface OrderData {
  orderId: string;
  scenario: OrderScenario;
  carrier: string;
  trackingNumber: string | null;
  estimatedDelivery: string | null;
  placedDate: string;
  shippingAddress: string;
  items: ProductItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  steps: TrackingStep[];
  delayReason?: string;
  reportedMissing?: boolean;
  reportedMissingDate?: string;
}
