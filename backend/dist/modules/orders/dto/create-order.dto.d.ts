declare class CustomerDto {
    name: string;
    email: string;
    phone?: string;
}
declare class ShippingAddressDto {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
declare class OrderItemDto {
    productId: string;
    name?: string;
    quantity: number;
    price?: number;
}
export declare class CreateOrderDto {
    customer: CustomerDto;
    shippingAddress: ShippingAddressDto;
    items: OrderItemDto[];
    paymentMethod: 'card' | 'paypal' | 'bank' | 'whatsapp';
}
export {};
