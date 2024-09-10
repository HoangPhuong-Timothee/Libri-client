import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book.model';
import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input() book?: Book

  constructor(private basketService: BasketService) { }

  addItemToBasket() {
    this.book && this.basketService.addItemToBasket(this.book)
  }

}
