import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    const url = 'http://localhost:3000/results'
    return this.http.get<Movie[]>(url)
  }

  addMovie(newMovie: any): Observable<any> {
    return this.http.post("http://localhost:3000/results", newMovie);
  }
}
