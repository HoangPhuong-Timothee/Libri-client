import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
