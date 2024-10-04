import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { Basket, BasketItem, BasketTotals } from '../models/basket.model';
import { mapToBasketItem } from 'src/app/shared/helpers/extensions/map-to-basketItem';
import { ToastrService } from 'ngx-toastr';
import { isBook } from 'src/app/shared/helpers/extensions/is-book';
import { Coupon } from '../models/coupon.model';
import { DeliveryMethod } from '../models/delivery-method.model';
import { DeliveryMethodService } from './delivery-method.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketSource = new BehaviorSubject<Basket | null>(null)
  basket$ = this.basketSource.asObservable()
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null)
  basketTotal$ = this.basketTotalSource.asObservable()
  private couponSource = new BehaviorSubject<Coupon | null>(null)
  coupon$ = this.couponSource.asObservable()
  delivery = 0

  constructor(private http: HttpClient, private toastr: ToastrService, private deliveryMethodService: DeliveryMethodService) { }

  setDeliveryPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentBasketValue()
    this.delivery = deliveryMethod.price
    if (basket)
    {
      basket.deliveryMethodId = deliveryMethod.id
      this.setBasket(basket)  
    }
  }

  get basketItemCount$() {
    return this.basket$.pipe(
      map(basket => basket ? basket.basketItems.reduce((sum, item) => sum + item.quantity, 0) : 0)
    )
  }

  //Get the basket from Redis
  getBasket(id: string) {
    return this.http.get<Basket>(`${environment.baseAPIUrl}/api/Baskets?id=${id}`).subscribe({
      next: ((basket) => {
        if (basket)
        {
          this.basketSource.next(basket)
          this.calculateTotal()
        }
      })
    })
  }

  //Update a bakset in Redis
  setBasket(basket: Basket) {
    return this.http.post<Basket>(`${environment.baseAPIUrl}/api/Baskets`, basket).subscribe({
      next: ((basket) => {
        if (basket)
        {
          this.basketSource.next(basket)
          this.calculateTotal()
        }
      })
    })
  }

  //Get basket info when changing
  getCurrentBasketValue() {
    return this.basketSource.value
  }

  //Delete basket
  deleteBasket(basket: Basket) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Baskets?id=${basket.id}`)
  }

  //Add an item/book to the basket
  addItemToBasket(item: Book | BasketItem, quantity = 1) {
    if (isBook(item)) {
      item = mapToBasketItem(item);
    }
    const basket = this.getCurrentBasketValue() ?? this.createBasket() //Check if is there any current basket in storage, if not create new basket
    basket.basketItems = this.addOrUpdateBasketItem(basket.basketItems, item, quantity) //Add/update basket item
    this.setBasket(basket) //Set basket item change in storage
  }

  createBasket(): Basket {
    const basket = new Basket()
    localStorage.setItem('basket_key', basket.id)
    return basket
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
      if (basket.basketItems.length > 0) {
        this.setBasket(basket)
      } else {
        this.basketSource.next(null)
        this.basketTotalSource.next(null)
        localStorage.removeItem('basket_key')
        this.toastr.info('Bạn không còn sách nào trong giỏ')
        this.deleteBasket(basket)
      }
    }
  }

  private addOrUpdateBasketItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const index = items.findIndex(x => x.id === itemToAdd.id)
    if (index === -1) {
      itemToAdd.quantity = quantity
      items.push(itemToAdd)
    } else {
      items[index].quantity += quantity
    }
    return items
  }

  private calculateTotal() {
    const basket = this.getCurrentBasketValue()
    if (!basket) return
    const delivery = 0
    const discount = 0
    const subtotal = basket.basketItems.reduce((a, b) => a + (b.price * b.quantity), 0)
    const total = subtotal + this.delivery - discount
    this.basketTotalSource.next({ delivery: this.delivery, total, subtotal, discount })
  }
}
