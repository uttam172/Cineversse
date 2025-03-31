import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TmdbApiService } from './services/tmdb-api.service';

import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';

import { Movie } from './models/movie.model';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, SearchComponent, CommonModule, SpinnerComponent],
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

