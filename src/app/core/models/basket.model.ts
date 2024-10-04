import * as cuid from 'cuid'

export interface Basket {
    id: string;
    basketItems: BasketItem[];
    clientSecrect?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    deliveryPrice?: number;
}

export interface BasketItem {
    id: number;
    bookTitle: string;
    price: number;
    quantity: number;
    imageUrl: string;
    author: string; 
}

export interface BasketTotals {
    delivery: number;
    subtotal: number;
    total: number;
    discount: number;
}

export class Basket implements Basket {
    id = cuid();
    basketItems: BasketItem[] = [];
    clientSecrect?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    deliveryPrice?: number;
}