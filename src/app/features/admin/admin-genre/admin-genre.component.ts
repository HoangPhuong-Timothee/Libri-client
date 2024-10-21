import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Genre } from 'src/app/core/models/genre.model';
import { GenreParams } from 'src/app/core/models/params.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { AddGenreFormComponent } from './add-genre-form/add-genre-form.component';
import { firstValueFrom } from 'rxjs';
import { EditGenreFormComponent } from './edit-genre-form/edit-genre-form.component';

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.css']
})
export class AdminGenreComponent implements OnInit {

  searchTerm: string = ''
  genreList: Genre[] = []
  adminGenreParams = new GenreParams()
  totalGenres = 0
  columns = [
    { field: 'id', header: 'ID' },
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
        this.openDeleteGenreDialog(row.id)
      }

    }
  ]

  constructor(
    private genreService: GenreService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getAllGenresForAdmin()
  }

  getAllGenresForAdmin() {
    this.genreService.getGenresForAdmin(this.adminGenreParams).subscribe({
      next: (response) => {
        if (response.data) {
          this.genreList = response.data
          this.totalGenres = response.count
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.adminGenreParams.pageIndex = event.pageIndex + 1
    this.adminGenreParams.pageSize = event.pageSize
    this.getAllGenresForAdmin()
  }

  onSearch() {
    this.adminGenreParams.search = this.searchTerm
    this.adminGenreParams.pageIndex = 1
    this.getAllGenresForAdmin()
  }

  onReset() {
    if (this.searchTerm) this.searchTerm = ''
    this.adminGenreParams = new GenreParams()
    this.getAllGenresForAdmin()  
  }

  openAddNewGenreDialog() {
    const dialog = this.dialog.open(AddGenreFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Thêm thể loại sách'
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          const genre: any = await firstValueFrom(this.genreService.addNewGenre(result.genre))
          if (genre) {
            this.genreList.push(genre)
          }
        }
      }
    })
  }

  // openImportGenresDialog() {

  // }

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

  async openDeleteGenreDialog(id: number) {
    const confirmed = await this.dialogService.confirmDialog(
      'Xác nhận xóa thể loại sách',
      'Bạn chắc chắn muốn xóa thể loại sách ? Vui lòng xác nhận bên dưới!'
    )
    if (confirmed) {
      this.genreService.deleteGenre(id).subscribe({
        next: () => {
          this.genreList = this.genreList.filter(g => g.id !== id)
        }
      })
    }
  }

}
