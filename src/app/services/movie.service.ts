import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { User } from 'lucide-angular';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = 'http://localhost:3000/results'

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url)
  }

  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, newMovie)
  }

  getSelectedMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.url+"/"+id)
  }

  editMovie(newData: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.url+"/"+newData.id, newData)
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.url+"/"+id)
  }
}
