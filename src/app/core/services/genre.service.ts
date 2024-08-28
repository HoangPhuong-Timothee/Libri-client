import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genres?: Genre[]


  constructor(private http: HttpClient) { }

  getAllGenres () {
    return this.http.get<Genre[]>(`${environment.baseAPIUrl}/api/Genres`)
  }
}
