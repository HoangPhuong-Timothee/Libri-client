import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Genre } from 'src/app/core/models/genre.model';
import { GenreParams } from 'src/app/core/models/params.model';
import { GenreService } from 'src/app/core/services/genre.service';

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
        console.log(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa thể loại sách',
      action: (row: any) => {
        console.log(row)
      }

    }
  ]

  constructor(private genreService: GenreService) {}

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

}
