import * as cuid from 'cuid'

export interface Basket {
    key: string;
    basketItems: BasketItem[];
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
    key = cuid();
    basketItems: BasketItem[] = [];
}