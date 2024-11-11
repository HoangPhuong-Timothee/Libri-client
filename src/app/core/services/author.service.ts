import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddAuthorRequest, Author, UpdateAuthorRequest } from '../models/author.model';
import { Pagination } from '../models/pagination.model';
import { AuthorParams } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  authors?: Author[]

  constructor(private http: HttpClient) { }

  getAllAuthors() {
    return this.http.get<Author[]>(`${environment.baseAPIUrl}/api/Authors`);
  }

  getAuthorsForAdmin(authorParams: AuthorParams) {
    let params = new HttpParams()
    if (authorParams.search) params = params.append('search', authorParams.search)
    params = params.append('pageIndex', authorParams.pageIndex)
    params = params.append('pageSize', authorParams.pageSize)
    return this.http.get<Pagination<Author[]>>(`${environment.baseAPIUrl}/api/Authors/admin/authors-list`, { params })
  }

  addNewAuthor(model: AddAuthorRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Authors`, model);
  }

  importAuthorsFromFile(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.baseAPIUrl}/api/Authors/import`, formData, { reportProgress: true, observe: 'events' })
  }

  updateAuthor(model: UpdateAuthorRequest) {
    return this.http.put(`${environment.baseAPIUrl}/api/Authors/${model.id}`, model);
  }

  deleteAuthor(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Authors/${id}`);
  }
}
