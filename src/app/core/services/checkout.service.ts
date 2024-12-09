import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../models/delivery-method.model';
import { CreateOrderRequest, Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  deliveryMethods: DeliveryMethod[] = []

  constructor(private http: HttpClient) { }

  getAllDeliveryMethods() {
    if (this.deliveryMethods?.length > 0) return of(this.deliveryMethods)
    return this.http.get<DeliveryMethod[]>(`${environment.baseAPIUrl}/api/Orders/delivery-methods`).pipe(
      map(response => {
        this.deliveryMethods = response.sort((a, b) => b.price - a.price)
        return response
      })
    )
  }

  createOrder(request: CreateOrderRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Orders/${request.basketId}`, request)
  }

}
