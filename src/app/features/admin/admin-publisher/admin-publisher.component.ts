import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PublisherParams } from 'src/app/core/models/params.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-admin-publisher',
  templateUrl: './admin-publisher.component.html',
  styleUrls: ['./admin-publisher.component.css']
})
export class AdminPublisherComponent implements OnInit {

  searchTerm: string = ''
  publisherList: Publisher[] = []
  adminPublisherParams = new PublisherParams()
  totalPublishers = 0
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nhà xuất bản' },
  ]
  actions = [
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Chỉnh sửa tên NXB',
      action: (row: any) => {
        console.log(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa NXB',
      action: (row: any) => {
        console.log(row)
      }

    }
  ]
  
  constructor(private publisherService: PublisherService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPublishersForAdmin()
  }

  getAllPublishersForAdmin() {
    this.publisherService.getPublishersForAdmin(this.adminPublisherParams).subscribe({
      next: reponse => {
        if (reponse.data) {
          this.publisherList = reponse.data
          this.totalPublishers = reponse.count
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.adminPublisherParams.pageIndex = event.pageIndex + 1
    this.adminPublisherParams.pageSize = event.pageSize
    this.getAllPublishersForAdmin()
  }

  onSearch() {
    this.adminPublisherParams.search = this.searchTerm
    this.adminPublisherParams.pageIndex = 1
    this.getAllPublishersForAdmin()
  }

  onReset() {
    if (this.searchTerm) this.searchTerm = ''
    this.adminPublisherParams = new PublisherParams()
    this.getAllPublishersForAdmin()
  }

}
