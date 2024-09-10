import { Component, OnInit } from '@angular/core';
import { BasketItem } from 'src/app/core/models/basket.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, public basketService: BasketService) { }

  basketItemsCount(basketItems: BasketItem[]) {
    return basketItems.reduce((sum, basketItem) => sum + basketItem.quantity, 0)
  }

}
