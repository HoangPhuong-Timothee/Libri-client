import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BasketItem } from 'src/app/core/models/basket.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin$?: Observable<boolean>
  basketItemCount$? = this.basketService.basketItemCount$

  constructor(public authService: AuthService, public basketService: BasketService) {}

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin$
  }
}
