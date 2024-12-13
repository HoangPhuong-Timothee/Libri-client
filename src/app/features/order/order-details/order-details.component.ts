import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order?: Order

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bcService: BreadcrumbService,
    private orderService: OrderService
  ) { this.bcService.set('@orderDetails', ' ') }

  ngOnInit(): void {
    this.getOrderDetails()
  }

  getOrderDetails() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      if (id) {
        this.orderService.getOrderDetails(+id).subscribe({
          next: (response) => {
            this.order = response
            this.bcService.set('@orderDetails', 'Đơn hàng #' + this.order.orderId.toString())
          },
          error: (error) => {
            console.error(error);
          }
        })
      }
    })
  }

  backToOrders() {
    return this.router.navigateByUrl('/order')
  }

}
