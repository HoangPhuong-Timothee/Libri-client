import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddPublisherRequest, Publisher, UpdatePublisherRequest } from '../models/publisher.model';
import { PublisherParams } from '../models/params.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  publishers?: Publisher[]

  constructor(private http: HttpClient) { }

  getAllPublishers() {
    return this.http.get<Publisher[]>(`${environment.baseAPIUrl}/api/Publishers`);
  }

  getPublishersForAdmin(publisherParams: PublisherParams) {
    let params = new HttpParams()
    if (publisherParams.search) params = params.append('search', publisherParams.search)
    params = params.append('pageIndex', publisherParams.pageIndex)
    params = params.append('pageSize', publisherParams.pageSize)
    return this.http.get<Pagination<Publisher[]>>(`${environment.baseAPIUrl}/api/Publishers/admin/publishers-list`, { params })
  }

  addNewPublisher(model: AddPublisherRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Publishers`, model)
  }

  updatePublisher(model: UpdatePublisherRequest) {
    return this.http.put(`${environment.baseAPIUrl}/api/Publishers/${model.id}`, model)
  }

  deletePublisher(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Publishers/${id}`)
  }
}
