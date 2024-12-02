import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { PublisherParams } from 'src/app/core/models/params.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PublisherService } from 'src/app/core/services/publisher.service';
import { AddPublisherFormComponent } from './add-publisher-form/add-publisher-form.component';
import { EditPublisherFormComponent } from './edit-publisher-form/edit-publisher-form.component';
import { ImportPublishersFormComponent } from './import-publihsers-form/import-publishers-form.component';

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
        this.openDeletePublisherDialog(row.id, row.name)
      }
    }
  ]

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private toastr: ToastrService
  )
  {
    this.searchTerm = ''
    this.adminPublisherParams = publisherService.getPublisherParams()
  }

  ngOnInit(): void {
    this.getAllPublishersForAdmin()
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

  openImportPublishersDialog(errors?: any) {
    const dialog = this.dialog.open(ImportPublishersFormComponent, {
      minWidth: '500px',
      maxHeight: '500px',
      autoFocus: false,
      data: {
        title: 'Nhập dữ liệu nhà xuất bản',
        errors: errors
      },
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.fileUploaded) {
          this.adminPublisherParams.pageIndex = 1
          this.getAllPublishersForAdmin()
        } else if (result && result.errors) {
          this.openImportPublishersDialog(result.errors)
        }
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
      next: async result => {
        if (result) {
          const response: any = await firstValueFrom(this.publisherService.addNewPublisher(result.publisher))
          if (response && response.status === 400) {
            this.toastr.error(response.message)
          }
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

  async openDeletePublisherDialog(id: number, name: string) {
    const confirmed = await this.dialogService.confirmDialog(
      'XÁC NHẬN XÓA',
      `Bạn chắc chắn muốn xóa nhà xuất bản "${name}"?`
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
