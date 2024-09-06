import * as cuid from 'cuid'

export interface BasketItem {
    id: number;
    bookName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    author: string; 
}

export interface Basket {
    key: string;
    basketItems: BasketItem[];
}

export class Basket implements Basket {
    key = cuid();
    basketItems: BasketItem[] = [];
}