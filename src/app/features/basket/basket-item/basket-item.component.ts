import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketItem } from 'src/app/core/models/basket.model';
import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent {

  @Input() basketItem?: BasketItem

  constructor(private toastr: ToastrService, public basketService: BasketService) { }

  increaseQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item)
  }

  removeItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity)
    this.toastr.success('Đã xóa sách khỏi giỏ')
  }
  
}
