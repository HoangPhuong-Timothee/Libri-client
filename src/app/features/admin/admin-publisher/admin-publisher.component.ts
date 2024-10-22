import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom } from 'rxjs';
import { PublisherParams } from 'src/app/core/models/params.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PublisherService } from 'src/app/core/services/publisher.service';
import { AddPublisherFormComponent } from './add-publisher-form/add-publisher-form.component';
import { EditPublisherFormComponent } from './edit-publisher-form/edit-publisher-form.component';
import { ImportPublihsersFormComponent } from './import-publihsers-form/import-publihsers-form.component';

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
        this.openUpdatePublisherDialog(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa NXB',
      action: (row: any) => {
        this.openDeletePublisherDialog(row.id)
      }

    }
  ]
  
  constructor(
    private publisherService: PublisherService, 
    private dialog: MatDialog, 
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.searchTerm = ''
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
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.adminPublisherParams = new PublisherParams()
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
      next: async result => {
        if (result) {
          const publisher: any = await firstValueFrom(this.publisherService.addNewPublisher(result.publisher))
          if (publisher) {
            this.publisherList.push(publisher)
          }
        }
      }
    })
  }

  openImportPublishersDialog() {
    const dialog = this.dialog.open(ImportPublihsersFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Thêm nhà xuất bản từ file'
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result && result.fileUploaded) {
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
          await firstValueFrom(this.publisherService.updatePublisher(result.publisher))
          const index = this.publisherList.findIndex(p => p.id === result.publisher.id)
          if (index !== -1) {
            this.publisherList[index] = result.publisher
          }
        }
      }
    })
  }

  async openDeletePublisherDialog(id: number) {
    const confirmed = await this.dialogService.confirmDialog(
      'Xác nhận xóa nhà xuất bản',
      'Bạn chắc chắn muốn xóa nhà xuất bản ? Vui lòng xác nhận bên dưới!'
    )
    if (confirmed) {
      this.publisherService.deletePublisher(id).subscribe({
        next: () => {
          this.publisherList = this.publisherList.filter(p => p.id !== id)
        }
      })
    }
  }

}
