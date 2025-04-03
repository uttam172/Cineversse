import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { throwError, Observable } from 'rxjs';

import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${environment.apiKey}`
    }
  }
  
  fetchMovies(query: string = ""): Observable<any> {
    return this.http.get<Movie[]>(query
      ? `${this.baseUrl}/search/movie?query=${encodeURI(query)}`
      : `${this.baseUrl}/discover/movie?sort_by=popularity.desc`, this.apiOptions).pipe(
        catchError(err => {
          console.log("Error fetching Movies:", err)
          return throwError(() => new Error("Failed to fatch movies"))
        })
      )
  }
}
