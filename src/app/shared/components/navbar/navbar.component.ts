import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BasketItem } from 'src/app/core/models/basket.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAdmin$?: Observable<boolean>

  constructor(public authService: AuthService, public basketService: BasketService) {
    this.isAdmin$ = this.authService.currentUser$.pipe(
      map((user) => {
          const roles = user?.roles;
          return Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin';
      })
    );
  }

  basketItemsCount(basketItems: BasketItem[]) {
    return basketItems.reduce((sum, basketItem) => sum + basketItem.quantity, 0)
  }

}
