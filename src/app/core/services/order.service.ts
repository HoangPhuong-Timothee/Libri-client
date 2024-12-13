import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { Pagination } from '../models/pagination.model';
import { OrderParams } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order?: Order
  ordersList: Order[] = []
  orders: Order[] = []
  orderPagination?: Pagination<Order[]>
  adminOrderPagination?: Pagination<Order[]>
  orderParams = new OrderParams()
  adminOrderParams = new OrderParams()
  orderCache = new Map<string, Pagination<Order[]>>()
  adminOrderCache = new Map<string, Pagination<Order[]>>()

  constructor(private http: HttpClient) { }

  setOrderParams(params: OrderParams) {
    this.orderParams = params
  }

  getOrderParams() {
    return this.orderParams
  }

  setAdminOrderParams(params: OrderParams) {
    this.adminOrderParams = params
  }

  getAdminOrderParams() {
    return this.adminOrderParams
  }

  getUserOrders(useCache = true): Observable<Pagination<Order[]>> {
    if (!useCache) {
      this.orderCache = new Map()
    }
    if (this.orderCache.size > 0 && useCache) {
      if (this.orderCache.has(Object.values(this.orderParams).join('-'))) {
        this.orderPagination = this.orderCache.get(Object.values(this.orderParams).join('-'))

        if(this.orderPagination) {
          return of(this.orderPagination)
        }
      }
    }
    let params = new HttpParams()
    if (this.orderParams.sort) params = params.append('sort', this.orderParams.sort)
    params = params.append('pageIndex', this.orderParams.pageIndex)
    params = params.append('pageSize', this.orderParams.pageSize)
    return this.http.get<Pagination<Order[]>>(`${environment.baseAPIUrl}/api/Orders`, { params }).pipe(
      map(response => {
        this.orders = [...this.orders, ...response.data]
        this.orderPagination = response
        return response
      })
    )
  }

  getUserOrdersForAdmin(useCache = true): Observable<Pagination<Order[]>> {
    if (!useCache) {
      this.adminOrderCache = new Map()
    }
    if (this.adminOrderCache.size > 0 && useCache) {
      if (this.adminOrderCache.has(Object.values(this.adminOrderParams).join('-'))) {
        this.adminOrderPagination = this.adminOrderCache.get(Object.values(this.adminOrderParams).join('-'))

        if(this.adminOrderPagination) {
          return of(this.adminOrderPagination)
        }
      }
    }
    let params = new HttpParams()
    if (this.adminOrderParams.sort) params = params.append('sort', this.adminOrderParams.sort)
    params = params.append('pageIndex', this.adminOrderParams.pageIndex)
    params = params.append('pageSize', this.adminOrderParams.pageSize)
    return this.http.get<Pagination<Order[]>>(`${environment.baseAPIUrl}/api/Orders/admin/orders-list`, { params }).pipe(
      map(response => {
        this.ordersList = [...this.ordersList, ...response.data]
        this.adminOrderPagination = response
        return response
      })
    )
  }

  getOrderDetails(id: number): Observable<Order> {
    const order = [...this.orderCache.values()].reduce((acc, paginationResult) => {
      return {
        ...acc,
        ...paginationResult.data.find(x => x.orderId === id)
      }
    }, {} as Order)
    if (Object.keys(order).length !== 0) {
      return of(order)
    }
    return this.http.get<Order>(`${environment.baseAPIUrl}/api/Orders/${id}`)
  }

}
