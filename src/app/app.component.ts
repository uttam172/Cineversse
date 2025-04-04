import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router';

import { TmdbApiService } from './services/tmdb-api.service';

import { HeaderComponent } from './components/header/header.component';

import { Movie } from './models/movie.model';

import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs'
import { updateSearchCount } from '../appwrite'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  movies: Movie[] = []
  error: string = ""
  isLoading: boolean = false
  query: string = ""

  private searchSubject = new Subject<string>()

  constructor(private tmdbService: TmdbApiService) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => {
        this.isLoading = true;
        return this.tmdbService.fetchMovies(query)
      })
    ).subscribe({
      next: (data: any) => {
        this.movies = data.results;
        this.isLoading = false;
        if (this.query && data.results.length > 0) {
          console.log(this.query, data.results[0]);
          updateSearchCount(this.query, data.results[0])
        }
        console.log("From app.component.js: ", data);
      },
      error: (err: string) => {
        console.log('API error:', err);
        this.error = 'Problem fetching movies, Try again later';
        this.isLoading = false;
      }
    })
    this.fetchMovies('');
  }

  setQuery(val: string) {
    this.searchSubject.next(val);
  }

  fetchMovies(query: string) {
    this.isLoading = true;
    this.tmdbService.fetchMovies(query).subscribe({
      next: (data: any) => {
        this.movies = data.results;
        this.isLoading = false;
      },
      error: (err: string) => {
        console.log('API error:', err);
        this.error = 'Problem fetching movies, Try again later';
        this.isLoading = false;
      }
    });
  }
}

