import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { Basket, BasketItem, BasketTotals } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketSource = new BehaviorSubject<Basket | null>(null)
  basketSource$ = this.basketSource.asObservable()
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null)
  basketTotalSource$ = this.basketTotalSource.asObservable()

  constructor(private http: HttpClient) { }

  //Get thr basket from Redis
  getBasket(key: string) {
    return this.http.get<Basket>(`${environment.baseAPIUrl}/api/Baskets?key=${key}`).subscribe({
      next: ((basket) => {
        this.basketSource.next(basket)
        this.calculateTotal()
      })
    })
  }

  //Update a bakset in Redis
  setBasket(basket: Basket) {
    return this.http.post<Basket>(`${environment.baseAPIUrl}/api/Baskets`, basket).subscribe({
      next: ((basket) => {
        this.basketSource.next(basket)
        this.calculateTotal()
      })
    })
  }

  //Get basket info when changing
  getCurrentBasketValue() {
    return this.basketSource.value
  }

  //Delete basket 
  deleteBasket(basket: Basket) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Baskets/${basket.key}`).subscribe({
      next: (() => {
        this.basketSource.next(null)
        this.basketTotalSource.next(null)
        localStorage.removeItem('basket_key')
      })
    })
  }

  //Add an item/book to the basket
  addItemToBasket(item: Book | BasketItem, quantity = 1) {
    if (this.isBook(item)) item = this.mapToBasketItem(item) //Check if item is book or not then map book to basket item
    const basket = this.getCurrentBasketValue() ?? this.createBasket() //Check if is there any current basket in storage, if not create new basket
    basket.basketItems = this.addOrUpdateBasketItem(basket.basketItems, item, quantity) //Add/update basket item
    this.setBasket(basket) //Set basket item change in storage
  }

  private mapToBasketItem(item: Book): BasketItem {
    return {
      id: item.id,
      bookName: item.title,
      price: item.price,
      quantity: 0,
      imageUrl: item.imageUrl,
      author: item.author
    }
  }

  createBasket(): Basket {
    const basket = new Basket()
    localStorage.setItem('basket_key', basket.key)
    return basket
  }

  private addOrUpdateBasketItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id)
    if (item) item.quantity += quantity
    else {
      itemToAdd.quantity = quantity
      items.push(itemToAdd)
    }
    return items
  }

  //Remove an item/book from the basket
  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue()
    if (!basket) return
    const item = basket.basketItems.find(x => x.id === id)
    if (item) {
      item.quantity -= quantity
      if (item.quantity === 0) {
        basket.basketItems = basket.basketItems.filter(x => x.id !== id)
      }
      if (basket.basketItems.length > 0) this.setBasket(basket)
      else this.deleteBasket(basket)
    }
  }

  private calculateTotal() {
    const basket = this.getCurrentBasketValue()
    if (!basket) return
    const shipping = 0
    const subtotal = basket.basketItems.reduce((a, b) => a + (b.price * b.quantity), 0)
    const total = subtotal + shipping
    this.basketTotalSource.next({ shipping, total, subtotal })
  }

  private isBook(item: Book | BasketItem): item is Book {
    return (item as Book).author != undefined
  }

}
