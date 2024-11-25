import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Genre } from 'src/app/core/models/genre.model';
import { GenreParams } from 'src/app/core/models/params.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { ErrorDetails } from "../../../core/models/error-response.model";
import { AddGenreFormComponent } from './add-genre-form/add-genre-form.component';
import { EditGenreFormComponent } from './edit-genre-form/edit-genre-form.component';
import { ImportGenresFormComponent } from './import-genres-form/import-genres-form.component';

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.css']
})
export class AdminGenreComponent implements OnInit {

  searchTerm: string = ''
  genreList: Genre[] = []
  adminGenreParams: GenreParams
  totalGenres = 0
  columns = [
    { field: 'id', header: 'Mã thể loại' },
    { field: 'name', header: 'Thể loại' },
  ]
  actions = [
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Chỉnh sửa tên thể loại',
      action: (row: any) => {
        this.openUpdateGenreDialog(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa thể loại sách',
      action: (row: any) => {
        this.openDeleteGenreDialog(row.id, row.name)
      }
    }
  ]

  constructor(
    private genreService: GenreService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private toastr: ToastrService
  )
  {
    this.adminGenreParams = genreService.getGenreParams()
  }

  ngOnInit(): void {
    this.getAllGenresForAdmin()
  }

  getAllGenresForAdmin() {
    this.genreService.getGenresForAdmin().subscribe({
      next: response => {
        this.genreList = response.data
        this.totalGenres = response.count
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openAddNewGenreDialog() {
    const dialog = this.dialog.open(AddGenreFormComponent, {
        minWidth: '500px',
        data: {
            title: 'Thêm thể loại sách'
        }
    })
    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.genreService.addNewGenre(result.addGenreRequest).subscribe({
            next: response  => {
              if (response.statusCode === 400) {
                this.toastr.error(response.message)
              } else if (response.statusCode === 201) {
                this.toastr.success(response.message)
                this.getAllGenresForAdmin()
              }
            }
          })
        }
      }
    })
  }

  openImportGenresDialog(errors?: ErrorDetails[]) {
    const dialog = this.dialog.open(ImportGenresFormComponent, {
      minWidth: '500px',
      maxHeight: '500px',
      autoFocus: true,
      data: {
        title: 'Nhập dữ liệu thể loại',
        errors: errors
      },
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.fileUploaded) {
          const params = this.genreService.getGenreParams()
          params.pageIndex = 1
          this.genreService.setGenreParams(params)
          this.adminGenreParams = params
          this.getAllGenresForAdmin()
        } else if (result && result.errors) {
          this.openImportGenresDialog(result.errors)
        }
      }
    })
  }

  openUpdateGenreDialog(genre: Genre) {
    const dialog = this.dialog.open(EditGenreFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Chỉnh sửa tên thể loại',
        genre
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          await firstValueFrom(this.genreService.updateGenre(result.genre))
          const index = this.genreList.findIndex(g => g.id === result.genre.id)
          if (index !== -1) {
            this.genreList[index] = result.genre
          }
        }
      }
    })
  }

  async openDeleteGenreDialog(id: number, name: string) {
    const confirmed = await this.dialogService.confirmDialog(
      'XÁC NHẬN XÓA',
      `Bạn chắc chắn muốn xóa thể loại "${name}"?`
    )
    if (confirmed) {
      this.genreService.deleteGenre(id).subscribe({
        next: () => {
          this.genreList = this.genreList.filter(g => g.id !== id)
          this.toastr.success(`Xóa thể loại "${name}" thành công`)
        },
        error: error => {
          console.log("Có lỗi xảy ra: ", error.errors, error.message)
        }
      })
    }
  }

  onPageChange(event: PageEvent) {
    const params = this.genreService.getGenreParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.genreService.setGenreParams(params)
    this.adminGenreParams = params
    this.getAllGenresForAdmin()
  }

  onSearch() {
    const params = this.genreService.getGenreParams()
    params.search = this.searchTerm
    params.pageIndex = 1
    this.genreService.setGenreParams(params)
    this.adminGenreParams = params
    this.getAllGenresForAdmin()
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.adminGenreParams = new GenreParams()
    this.genreService.setGenreParams(this.adminGenreParams)
    this.getAllGenresForAdmin()
  }

}
