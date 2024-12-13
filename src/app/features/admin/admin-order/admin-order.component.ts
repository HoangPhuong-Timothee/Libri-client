import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Order } from 'src/app/core/models/order.model';
import { OrderParams } from 'src/app/core/models/params.model';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { OrderFilterDialogComponent } from './order-filter-dialog/order-filter-dialog.component';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  searchTerm: string = ''
  ordersList: Order[] = []
  order?: Order
  adminOrderParams: OrderParams
  totalOrders = 0
  columns = [
    { field: 'id', header: 'Mã đơn hàng' },
    { field: ['bookTitle', 'bookImageUrl'], header: 'Sách', haveImage: true },
    { field: 'userEmail', header: 'Email' },
    { field: 'orderDate', header: 'Ngày đặt hàng' },
    { field: 'status', header: 'Tình trạng đơn hàng' },
    { field: 'total', header: 'Tổng tiền', pipe: 'currency', pipeArgs: 'VND' }
  ]
  actions = [
    {
      label: 'Xem',
      icon: 'visibility',
      tooltip: 'Xem thông tin chi tiết đơn hàng',
      action: (row: any) => {
        this.openOrderDetailsDialog(row)
      }
    }
  ]

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) { this.adminOrderParams = orderService.getAdminOrderParams() }

  ngOnInit(): void {
    this.getUserOrdersForAdmin()
  }

  getUserOrdersForAdmin() {
    this.orderService.getUserOrdersForAdmin().subscribe({
      next: response => {
        this.ordersList = response.data
        this.totalOrders = response.count
      },
      error: error => {
        console.log("Có lỗi: ", error)
      }
    })
  }

  openFilterDialog() {
    let dialog = this.dialog.open(OrderFilterDialogComponent, {
      minWidth: '500px'
    })
    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
          const params = this.orderService.getAdminOrderParams()
          params.pageIndex = 1
          this.orderService.setAdminOrderParams(params)
          this.adminOrderParams = params
          this.getUserOrdersForAdmin()
        }
      }
    })
  }

  openOrderDetailsDialog(order: Order) {
    this.orderService.getOrderDetails(order.orderId).subscribe({
      next: (response) => {
        this.order = response
        this.dialog.open(OrderDetailsDialogComponent, {
          minWidth: '300px',
          maxWidth: '1000px',
          minHeight: '200px',
          maxHeight: '580px',
          data: {
            title: `Thông tin đơn hàng #${this.order.orderId}`,
            book: this.order
          }
        })
      },
      error: (error) => {
        console.error('Có lỗi xảy ra:', error)
      }
    })
  }

  onReset() {
    const params = this.orderService.getAdminOrderParams()
    params.pageIndex = 1
    this.orderService.setAdminOrderParams(params)
    this.adminOrderParams = params
    this.getUserOrdersForAdmin()
  }

  onPageChange(event: PageEvent) {
    const params = this.orderService.getAdminOrderParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.orderService.setAdminOrderParams(params)
    this.adminOrderParams = params
    this.getUserOrdersForAdmin()
  }

}
