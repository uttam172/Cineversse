import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TmdbApiService } from './services/tmdb-api.service';

import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';

import { Movie } from './models/movie.model';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'

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

  constructor(private tmdbService: TmdbApiService) {  
    this.searchSubject.subscribe(value => {
      this.query = value; 
      console.log("Latest Query:", this.query);
    });
  }

  setQuery(val: string) {
    this.searchSubject.next(val)
  }

  getQuery(): string {
    return this.query
  }

  ngOnInit() {
    this.tmdbService.fetchMovies(this.query).subscribe({
      next: (data: any) => {
        this.movies = data.results
      }, 
      error: (err: string) => {
        console.log("API error: ", err)
        this.error = "Problem fetching movies, Try again later"
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }
}

