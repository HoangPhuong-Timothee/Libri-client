import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination.model';
import { PublisherParams } from '../models/params.model';
import { AddPublisherRequest, Publisher } from '../models/publisher.model';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  publishers: Publisher[] = []
  publishersList: Publisher[] = []
  publisherPagination?: Pagination<Publisher[]>
  publisherParams = new PublisherParams()
  publisherCache = new Map<string, Pagination<Publisher[]>>()

  constructor(private http: HttpClient) { }

  getAllPublishers() {
    if (this.publishers.length > 0) {
      return of(this.publishers)
    }
    return this.http.get<Publisher[]>(`${environment.baseAPIUrl}/api/Publishers`)
  }

  getPublishersForAdmin(useCache = true): Observable<Pagination<Publisher[]>> {
    if (!useCache) {
      this.publisherCache = new Map()
    }
    if (this.publisherCache.size > 0 && useCache) {
      if (this.publisherCache.has(Object.values(this.publisherParams).join('-'))) {
        this.publisherPagination = this.publisherCache.get(Object.values(this.publisherParams).join('-'))
        if(this.publisherPagination) {
          return of(this.publisherPagination)
        }
      }
    }
    let params = new HttpParams()
    if (this.publisherParams.search) params = params.append('search', this.publisherParams.search)
    params = params.append('pageIndex', this.publisherParams.pageIndex)
    params = params.append('pageSize', this.publisherParams.pageSize)
    return this.http.get<Pagination<Publisher[]>>(`${environment.baseAPIUrl}/api/Publishers/admin/publishers-list`, { params }).pipe(
      map(response => {
        this.publishersList = [...this.publishersList, ...response.data]
        this.publisherPagination = response
        return response
      })
    )
  }

  setPublisherParams(params: PublisherParams) {
    this.publisherParams = params
  }

  getPublisherParams() {
    return this.publisherParams
  }

  addNewPublisher(addPulisherRequest: AddPublisherRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Publishers`, addPulisherRequest)
  }

  importPublishersFromFile(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.baseAPIUrl}/api/Publishers/import-from-file`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  updatePublisher(model: Publisher) {
    return this.http.put(`${environment.baseAPIUrl}/api/Publishers/${model.id}`, model)
  }

  deletePublisher(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Publishers/${id}`)
  }

}
