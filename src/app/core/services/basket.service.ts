import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../models/basket.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketSource = new BehaviorSubject<Basket | null>(null)
  basketSource$ = this.basketSource.asObservable()

  constructor(private http: HttpClient) { }

  getBasket(key: string) {
    return this.http.get<Basket>(`${environment.baseAPIUrl}/api/Baskets/${key}`).subscribe({
      next: ((basket) => {
        this.basketSource.next(basket)
      })
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(`${environment.baseAPIUrl}/api/Baskets`, basket).subscribe({
      next: ((basket) => {
        this.basketSource.next(basket)
      })
    })
  }

  getCurrentBasket() {
    return this.basketSource.value
  }
}
