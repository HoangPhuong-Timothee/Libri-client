import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Order } from 'src/app/core/models/order.model';
import { OrderParams } from 'src/app/core/models/params.model';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = []
  totalOrders: number = 0
  orderParams: OrderParams
  sortOptions = [
    { name: 'Mới nhất', value: 'newest' },
    { name: 'Cũ nhất', value: 'oldest' }
  ]

  constructor(
    private orderService: OrderService
  ) { this.orderParams = orderService.getOrderParams() }

  ngOnInit(): void {
    this.getUserOrders()
  }

  getUserOrders() {
    this.orderService.getUserOrders().subscribe({
      next: response => {
        this.orders = response.data
        this.totalOrders = response.count
      }
    })
  }

  onPageChange(event: PageEvent) {
    const params = this.orderService.getOrderParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.orderService.setOrderParams(params)
    this.orderParams = params
    this.getUserOrders()
  }

}
