import type { OrderData } from './types';

const headphoneImg =
  'https://images.pexels.com/photos/7772548/pexels-photo-7772548.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const watchImg =
  'https://images.pexels.com/photos/13007642/pexels-photo-13007642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const sneakerImg =
  'https://images.pexels.com/photos/1456733/pexels-photo-1456733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const baseItems = [
  {
    id: 'p1',
    name: 'AuraSound Pro Headphones',
    variant: 'Midnight Black',
    quantity: 1,
    price: 249.0,
    image: headphoneImg,
  },
  {
    id: 'p2',
    name: 'PulseFit Smartwatch S3',
    variant: 'Silver / Sport Band',
    quantity: 1,
    price: 189.0,
    image: watchImg,
  },
];

const baseTotals = {
  subtotal: 438.0,
  shipping: 0,
  tax: 35.04,
  total: 473.04,
};

const baseAddress = '1428 Maple Avenue, Apt 4B\nSan Francisco, CA 94110';

export const orders: Record<string, OrderData> = {
  in_transit: {
    orderId: 'ORD-84720-394',
    scenario: 'in_transit',
    carrier: 'ExpressPost',
    trackingNumber: 'EP-9384-7521-0034',
    estimatedDelivery: 'Tomorrow, Sep 23 · 2:00 PM – 5:00 PM',
    placedDate: 'Sep 19, 2026',
    shippingAddress: baseAddress,
    items: baseItems,
    ...baseTotals,
    steps: [
      {
        key: 'confirmed',
        label: 'Order Confirmed',
        description: 'Payment received and order placed',
        timestamp: 'Sep 19, 9:42 AM',
        status: 'completed',
      },
      {
        key: 'processing',
        label: 'Processing',
        description: 'Items packed at fulfillment center',
        timestamp: 'Sep 20, 3:15 PM',
        status: 'completed',
      },
      {
        key: 'shipped',
        label: 'Shipped',
        description: 'Picked up by ExpressPost',
        timestamp: 'Sep 21, 11:08 AM',
        status: 'completed',
      },
      {
        key: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'On the truck and heading your way',
        timestamp: 'Today, 8:30 AM',
        status: 'current',
      },
      {
        key: 'delivered',
        label: 'Delivered',
        description: 'Estimated tomorrow by 5:00 PM',
        timestamp: null,
        status: 'upcoming',
      },
    ],
  },

  delayed: {
    orderId: 'ORD-51938-771',
    scenario: 'delayed',
    carrier: 'ExpressPost',
    trackingNumber: 'EP-5512-8830-2210',
    estimatedDelivery: 'Was expected Sep 20 — now delayed',
    placedDate: 'Sep 14, 2026',
    shippingAddress: baseAddress,
    items: [
      {
        id: 'p3',
        name: 'Strider Running Sneakers',
        variant: 'Charcoal / Size 10',
        quantity: 2,
        price: 129.0,
        image: sneakerImg,
      },
    ],
    subtotal: 258.0,
    shipping: 8.0,
    tax: 20.64,
    total: 286.64,
    delayReason:
      'Your package is delayed due to severe weather affecting the regional sorting facility. The carrier has updated the estimated delivery window.',
    steps: [
      {
        key: 'confirmed',
        label: 'Order Confirmed',
        description: 'Payment received and order placed',
        timestamp: 'Sep 14, 2:20 PM',
        status: 'completed',
      },
      {
        key: 'processing',
        label: 'Processing',
        description: 'Items packed at fulfillment center',
        timestamp: 'Sep 15, 10:00 AM',
        status: 'completed',
      },
      {
        key: 'shipped',
        label: 'Shipped',
        description: 'Picked up by ExpressPost',
        timestamp: 'Sep 16, 1:45 PM',
        status: 'completed',
      },
      {
        key: 'out_for_delivery',
        label: 'In Transit — Delayed',
        description: 'Held at regional facility due to weather',
        timestamp: 'Sep 18, 6:00 AM',
        status: 'current',
      },
      {
        key: 'delivered',
        label: 'Delivered',
        description: 'New estimate: Sep 24 by 8:00 PM',
        timestamp: null,
        status: 'upcoming',
      },
    ],
  },

  delivered_not_received: {
    orderId: 'ORD-30215-884',
    scenario: 'delivered_not_received',
    carrier: 'ExpressPost',
    trackingNumber: 'EP-2207-6619-1190',
    estimatedDelivery: 'Marked delivered Sep 21 at 1:12 PM',
    placedDate: 'Sep 16, 2026',
    shippingAddress: baseAddress,
    items: baseItems,
    ...baseTotals,
    reportedMissing: false,
    steps: [
      {
        key: 'confirmed',
        label: 'Order Confirmed',
        description: 'Payment received and order placed',
        timestamp: 'Sep 16, 11:00 AM',
        status: 'completed',
      },
      {
        key: 'processing',
        label: 'Processing',
        description: 'Items packed at fulfillment center',
        timestamp: 'Sep 17, 8:30 AM',
        status: 'completed',
      },
      {
        key: 'shipped',
        label: 'Shipped',
        description: 'Picked up by ExpressPost',
        timestamp: 'Sep 18, 2:00 PM',
        status: 'completed',
      },
      {
        key: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'On the truck and heading your way',
        timestamp: 'Sep 21, 7:45 AM',
        status: 'completed',
      },
      {
        key: 'delivered',
        label: 'Marked Delivered',
        description: 'Left at front door per carrier',
        timestamp: 'Sep 21, 1:12 PM',
        status: 'current',
      },
    ],
  },

  tracking_unavailable: {
    orderId: 'ORD-99401-220',
    scenario: 'tracking_unavailable',
    carrier: 'ExpressPost',
    trackingNumber: null,
    estimatedDelivery: 'Estimated Sep 24 – Sep 26',
    placedDate: 'Sep 22, 2026',
    shippingAddress: baseAddress,
    items: [
      {
        id: 'p2',
        name: 'PulseFit Smartwatch S3',
        variant: 'Silver / Sport Band',
        quantity: 1,
        price: 189.0,
        image: watchImg,
      },
    ],
    subtotal: 189.0,
    shipping: 0,
    tax: 15.12,
    total: 204.12,
    steps: [
      {
        key: 'confirmed',
        label: 'Order Confirmed',
        description: 'Payment received and order placed',
        timestamp: 'Sep 22, 10:15 AM',
        status: 'completed',
      },
      {
        key: 'processing',
        label: 'Processing',
        description: 'Items being prepared at fulfillment center',
        timestamp: null,
        status: 'current',
      },
      {
        key: 'shipped',
        label: 'Shipped',
        description: 'Awaiting carrier pickup',
        timestamp: null,
        status: 'upcoming',
      },
      {
        key: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'Not yet available',
        timestamp: null,
        status: 'upcoming',
      },
      {
        key: 'delivered',
        label: 'Delivered',
        description: 'Not yet available',
        timestamp: null,
        status: 'upcoming',
      },
    ],
  },
};
