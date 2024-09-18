import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging-footer',
  templateUrl: './paging-footer.component.html',
  styleUrls: ['./paging-footer.component.css']
})  
export class PagingFooterComponent implements OnInit {

  @Input() totalCount?: number
  @Input() pageSize?: number
  @Output() pageChanged = new EventEmitter<number>()

  onPagerChanged(event: any) {
    this.pageChanged.emit(event.page)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
