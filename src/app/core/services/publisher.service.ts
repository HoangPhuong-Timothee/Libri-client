import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publisher } from '../models/publisher.model';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  publishers?: Publisher[]

  constructor(private http: HttpClient) { }

  getAllPublishers() {
    return this.http.get<Publisher[]>(`${environment.baseAPIUrl}/api/Publishers`);
  }
}
