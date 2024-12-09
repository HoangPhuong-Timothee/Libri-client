import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PublisherParams } from 'src/app/core/models/params.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PublisherService } from 'src/app/core/services/publisher.service';
import { AddPublisherFormComponent } from './add-publisher-form/add-publisher-form.component';
import { EditPublisherFormComponent } from './edit-publisher-form/edit-publisher-form.component';

@Component({
  selector: 'app-admin-publisher',
  templateUrl: './admin-publisher.component.html',
  styleUrls: ['./admin-publisher.component.css']
})
export class AdminPublisherComponent implements OnInit {

  searchTerm: string
  publisherList: Publisher[] = []
  adminPublisherParams: PublisherParams
  totalPublishers = 0
  columns = [
    { field: 'id', header: 'Mã NXB' },
    { field: 'name', header: 'Nhà xuất bản' },
    { field: 'createInfo', header: 'Thông tin tạo' },
    { field: 'updateInfo', header: 'Thông tin cập nhật' }
  ]
  actions = [
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Chỉnh sửa tên NXB',
      action: (row: any) => {
        this.openUpdatePublisherDialog(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa NXB',
      action: (row: any) => {
        this.openDeletePublisherDialog(row)
      }
    }
  ]

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog,
    private dialogService: DialogService
  )
  {
    this.searchTerm = ''
    this.adminPublisherParams = publisherService.getPublisherParams()
  }

  ngOnInit(): void {
    this.getAllPublishersForAdmin()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  getAllPublishersForAdmin() {
    this.publisherService.getPublishersForAdmin().subscribe({
      next: reponse => {
        this.publisherList = reponse.data
        this.totalPublishers = reponse.count
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onPageChange(event: PageEvent) {
    const params = this.publisherService.getPublisherParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.publisherService.setPublisherParams(params)
    this.adminPublisherParams = params
    this.getAllPublishersForAdmin()
  }

  onSearch() {
    const params = this.publisherService.getPublisherParams()
    params.search = this.searchTerm
    params.pageIndex = 1
    this.publisherService.setPublisherParams(params)
    this.adminPublisherParams = params
    this.getAllPublishersForAdmin()
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.adminPublisherParams = new PublisherParams()
    this.publisherService.setPublisherParams(this.adminPublisherParams)
    this.getAllPublishersForAdmin()
  }

  openAddNewPublisherDialog() {
    const dialog = this.dialog.open(AddPublisherFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Thêm nhà xuất bản'
      }
    })
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.success) {
          const params = this.publisherService.getPublisherParams()
          params.pageIndex = 1
          this.publisherService.setPublisherParams(params)
          this.adminPublisherParams = params
          this.getAllPublishersForAdmin()
        }
      }
    })
  }

  openUpdatePublisherDialog(publisher: Publisher) {
    const dialog = this.dialog.open(EditPublisherFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Chỉnh sửa tên nhà xuất bản',
        publisher
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          if (result && result.success) {
            const params = this.publisherService.getPublisherParams()
            params.pageIndex = 1
            this.publisherService.setPublisherParams(params)
            this.adminPublisherParams = params
            this.getAllPublishersForAdmin()
          }
        }
      }
    })
  }

  async openDeletePublisherDialog(publisher: Publisher) {
    const confirmed = await this.dialogService.confirmDialog(
      'XÁC NHẬN XÓA',
      `Bạn chắc chắn muốn xóa nhà xuất bản "${publisher.name}"?`
    )
    if (confirmed) {
      this.publisherService.deletePublisher(publisher.id).subscribe({
        next: () => {
          this.publisherList = this.publisherList.filter(p => p.id !== publisher.id)
        }
      })
    }
  }

}
