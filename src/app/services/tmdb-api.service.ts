import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment, apiOptions } from '../../environments/environment';
import { catchError } from 'rxjs';
import { throwError, Observable } from 'rxjs';

import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  fetchMovies(): Observable<any> {
    return this.http.get<Movie[]>(`${this.baseUrl}?sort_by=popularity.desc`).pipe(
      catchError(err => {
        console.log("Error fetching Movies:", err)
        return throwError(() => new Error("Failed to fatch movies"))
      })
    )
  }
}
