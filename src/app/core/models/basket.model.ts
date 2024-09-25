import * as cuid from 'cuid'

export interface Basket {
    id: string;
    basketItems: BasketItem[];
    clientSecrect?: string;
    paymentIntentId?: number;
    deliveryMethodId?: number
}

export interface BasketItem {
    id: number;
    bookName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    author: string; 
}

export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}

export class Basket implements Basket {
    id = cuid();
    basketItems: BasketItem[] = [];
}