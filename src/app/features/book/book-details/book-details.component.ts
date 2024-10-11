import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Book } from 'src/app/core/models/book.model';
import { BasketService } from 'src/app/core/services/basket.service';
import { BookService } from 'src/app/core/services/book.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book?: Book
  similarBooks: Book[] = []
  quantity = 1
  quantityInBasket = 0

  constructor(private toastr: ToastrService, private bookService: BookService, private route: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@bookDetails', ' ')
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      if (id) {
        this.showBookDetails(+id) 
        this.showSimilarBooks(+id) 
      }
    })
    // this.showBookDetails()
    // this.showSimilarBooks()
  }

  showBookDetails(id: number) {
    // let id = this.route.snapshot.paramMap.get('id')
    /*if(id)*/ this.bookService.getSingleBook(id).subscribe({
      next: (reponse) => {
        this.book = reponse
        this.bcService.set('@bookDetails', this.book.title)
        this.basketService.basket$.pipe(take(1)).subscribe({
          next: ((basket) => {
            const basketItem = basket?.basketItems.find(x => x.id === +id)
            if (basketItem) {
              this.quantity = basketItem.quantity
              this.quantityInBasket = basketItem.quantity
            }
          })
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  showSimilarBooks(id: number) {
    // let id = this.route.snapshot.paramMap.get('id')
    /*if (id)*/ this.bookService.getSimilarBook(id).subscribe({
      next: response => this.similarBooks = response
    })
  }

  increaseQuantity() {
    this.quantity++
  }

  decreaseQuantity() {
    this.quantity--
    if (this.quantity <= 0)
    {
      this.quantity = 0
    }
  }

  updateBasket() {
    if (this.book) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket
        this.quantityInBasket += itemsToAdd
        this.basketService.addItemToBasket(this.book, itemsToAdd)
      }else {
        const itemsToRemove = this.quantityInBasket - this.quantity
        this.quantityInBasket -= itemsToRemove
        this.basketService.removeItemFromBasket(this.book.id, itemsToRemove)
      }
      this.toastr.success('Cập nhật giỏ hàng thành công')
    } else{
      this.toastr.error('Có lỗi xảy ra, không thể cập nhật giỏ sách')
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? "Thêm vào giỏ" : "Cập nhật giỏ"
  }

}
