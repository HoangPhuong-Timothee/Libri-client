import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book?: Book

  constructor() { }

  ngOnInit(): void {
  }

}
