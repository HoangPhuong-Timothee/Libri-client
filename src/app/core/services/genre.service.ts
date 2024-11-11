import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddGenreRequest, Genre, UpdateGenreRequest } from '../models/genre.model';
import { Pagination } from '../models/pagination.model';
import { GenreParams } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genres?: Genre[]

  constructor(private http: HttpClient) { }

  getAllGenres () {
    return this.http.get<Genre[]>(`${environment.baseAPIUrl}/api/Genres`)
  }

  getGenresForAdmin(genreParams: GenreParams) {
    let params = new HttpParams()
    if (genreParams.search) params = params.append('search', genreParams.search)
    params = params.append('pageIndex', genreParams.pageIndex)
    params = params.append('pageSize', genreParams.pageSize)
    return this.http.get<Pagination<Genre[]>>(`${environment.baseAPIUrl}/api/Genres/admin/genres-list`, { params })
  }

  addNewGenre(model: AddGenreRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Genres`, model)
  }

  importGenresFromFile(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.baseAPIUrl}/api/Genres/import`, formData, { reportProgress: true, observe: 'events' })
  }

  updateGenre(model: UpdateGenreRequest) {
    return this.http.put(`${environment.baseAPIUrl}/api/Genres/${model.id}`, model)
  }

  deleteGenre(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Genres/${id}`)
  }
}
