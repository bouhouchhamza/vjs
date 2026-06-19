export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'paypal' | 'bank' | 'whatsapp';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}
export interface Order {
    id: string;
    userId?: string;
    customer: {
        name: string;
        email: string;
        phone?: string;
    };
    shippingAddress: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    items: OrderItem[];
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    whatsappUrl?: string;
    createdAt: string;
}
