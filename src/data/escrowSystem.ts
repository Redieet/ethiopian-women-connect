export interface Order {
  id: string;
  productId: string;
  productName: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  amount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'confirmed' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  createdAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  deliveryCode: string;
  logisticsDriverId?: string;
  logisticsDriverName?: string;
  trackingNumber?: string;
  adminNotificationSent: boolean;
  sellerNotificationSent: boolean;
  buyerNotificationSent: boolean;
  logisticsNotificationSent: boolean;
}

export interface EscrowTransaction {
  id: string;
  orderId: string;
  amount: number;
  sellerAmount: number;
  logisticsAmount: number;
  platformFee: number;
  status: 'held' | 'released' | 'refunded';
  createdAt: string;
  releasedAt?: string;
}

export interface Notification {
  id: string;
  type: 'order_created' | 'payment_received' | 'order_shipped' | 'order_delivered' | 'payment_released';
  recipient: 'admin' | 'seller' | 'buyer' | 'logistics';
  recipientId: string;
  recipientEmail: string;
  title: string;
  message: string;
  orderId: string;
  sent: boolean;
  createdAt: string;
}

// Mock data for demonstration
export const mockOrders: Order[] = [
  {
    id: "order-001",
    productId: "prod-1",
    productName: "Sidamo Coffee Beans",
    sellerId: "seller-1",
    sellerName: "Sara Alemayehu",
    buyerId: "buyer-001",
    buyerName: "Marta K.",
    buyerEmail: "marta@example.com",
    amount: 1200,
    deliveryFee: 150,
    totalAmount: 1350,
    paymentMethod: "telebirr",
    status: "paid",
    createdAt: "2024-01-15T10:30:00Z",
    confirmedAt: "2024-01-15T10:35:00Z",
    deliveryCode: "DEL-001-ABC",
    adminNotificationSent: true,
    sellerNotificationSent: true,
    buyerNotificationSent: true,
    logisticsNotificationSent: false
  }
];

export const mockEscrowTransactions: EscrowTransaction[] = [
  {
    id: "escrow-001",
    orderId: "order-001",
    amount: 1350,
    sellerAmount: 1080, // 80% to seller
    logisticsAmount: 135, // 10% to logistics
    platformFee: 135, // 10% platform fee
    status: "held",
    createdAt: "2024-01-15T10:35:00Z"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "order_created",
    recipient: "admin",
    recipientId: "admin-001",
    recipientEmail: "admin@ethiopianwomenconnect.com",
    title: "New Order Received",
    message: "A new order has been placed for Sidamo Coffee Beans. Order ID: order-001",
    orderId: "order-001",
    sent: true,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "notif-002",
    type: "payment_received",
    recipient: "seller",
    recipientId: "seller-1",
    recipientEmail: "sara@example.com",
    title: "Payment Received",
    message: "Payment of 1,350 ETB has been received for your product. Order ID: order-001",
    orderId: "order-001",
    sent: true,
    createdAt: "2024-01-15T10:35:00Z"
  }
];

// Escrow system functions
export const createOrder = (orderData: Partial<Order>): Order => {
  const order: Order = {
    id: `order-${Date.now()}`,
    productId: orderData.productId || "",
    productName: orderData.productName || "",
    sellerId: orderData.sellerId || "",
    sellerName: orderData.sellerName || "",
    buyerId: orderData.buyerId || "buyer-001",
    buyerName: orderData.buyerName || "Current User",
    buyerEmail: orderData.buyerEmail || "user@example.com",
    amount: orderData.amount || 0,
    deliveryFee: orderData.deliveryFee || 0,
    totalAmount: orderData.totalAmount || 0,
    paymentMethod: orderData.paymentMethod || "",
    status: "pending",
    createdAt: new Date().toISOString(),
    deliveryCode: `DEL-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
    adminNotificationSent: false,
    sellerNotificationSent: false,
    buyerNotificationSent: false,
    logisticsNotificationSent: false
  };
  
  return order;
};

export const processPayment = (order: Order): Order => {
  const updatedOrder = {
    ...order,
    status: "paid" as const,
    confirmedAt: new Date().toISOString(),
    adminNotificationSent: true,
    sellerNotificationSent: true,
    buyerNotificationSent: true
  };
  
  // Create escrow transaction
  const escrowTransaction: EscrowTransaction = {
    id: `escrow-${Date.now()}`,
    orderId: order.id,
    amount: order.totalAmount,
    sellerAmount: Math.floor(order.totalAmount * 0.8), // 80% to seller
    logisticsAmount: Math.floor(order.totalAmount * 0.1), // 10% to logistics
    platformFee: Math.floor(order.totalAmount * 0.1), // 10% platform fee
    status: "held",
    createdAt: new Date().toISOString()
  };
  
  return updatedOrder;
};

export const shipOrder = (order: Order, logisticsDriverId: string, logisticsDriverName: string): Order => {
  return {
    ...order,
    status: "shipped",
    shippedAt: new Date().toISOString(),
    logisticsDriverId,
    logisticsDriverName,
    trackingNumber: `TRK-${Date.now().toString().slice(-8)}`,
    logisticsNotificationSent: true
  };
};

export const deliverOrder = (order: Order): Order => {
  return {
    ...order,
    status: "delivered",
    deliveredAt: new Date().toISOString()
  };
};

export const releasePayment = (order: Order): EscrowTransaction => {
  const escrowTransaction: EscrowTransaction = {
    id: `escrow-${Date.now()}`,
    orderId: order.id,
    amount: order.totalAmount,
    sellerAmount: Math.floor(order.totalAmount * 0.8),
    logisticsAmount: Math.floor(order.totalAmount * 0.1),
    platformFee: Math.floor(order.totalAmount * 0.1),
    status: "released",
    createdAt: new Date().toISOString(),
    releasedAt: new Date().toISOString()
  };
  
  return escrowTransaction;
};

export const createNotification = (
  type: Notification['type'],
  recipient: Notification['recipient'],
  recipientId: string,
  recipientEmail: string,
  orderId: string,
  order: Order
): Notification => {
  const notificationTemplates = {
    order_created: {
      title: "New Order Received",
      message: `A new order has been placed for ${order.productName}. Order ID: ${order.id}`
    },
    payment_received: {
      title: "Payment Received",
      message: `Payment of ${order.totalAmount} ETB has been received for your product. Order ID: ${order.id}`
    },
    order_shipped: {
      title: "Order Shipped",
      message: `Your order ${order.id} has been shipped and is on its way. Tracking: ${order.trackingNumber}`
    },
    order_delivered: {
      title: "Order Delivered",
      message: `Your order ${order.id} has been successfully delivered. Please confirm receipt.`
    },
    payment_released: {
      title: "Payment Released",
      message: `Payment of ${Math.floor(order.totalAmount * 0.8)} ETB has been released to your account for order ${order.id}`
    }
  };
  
  const template = notificationTemplates[type];
  
  return {
    id: `notif-${Date.now()}`,
    type,
    recipient,
    recipientId,
    recipientEmail,
    title: template.title,
    message: template.message,
    orderId,
    sent: false,
    createdAt: new Date().toISOString()
  };
};

// Email addresses for different roles
export const EMAIL_ADDRESSES = {
  ADMIN: "admin@ethiopianwomenconnect.com",
  LOGISTICS: "logistics@ethiopianwomenconnect.com",
  SUPPORT: "support@ethiopianwomenconnect.com",
  NOTIFICATIONS: "notifications@ethiopianwomenconnect.com"
};
