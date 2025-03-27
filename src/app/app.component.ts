import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TmdbApiService } from './services/tmdb-api.service';

import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';

import { Movie } from './models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CardComponent, SearchComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  query: string = ""
  movies: Movie[] = []
  error: string = ""
  isLoading: boolean = false

  setQuery(val: string) { this.query = val }

  constructor(private tmdbService: TmdbApiService) {
    this.isLoading = true
    this.error = ""
    this.movies = []
    this.query = ""
    this.isLoading = false
  }

  async ngOnInit() {
    this.tmdbService.fetchMovies().subscribe({
      next: (data: any) => {
        // const fetchedMovies = JSON.stringify(data.results, null, 2)
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

