import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs'

import { CardComponent } from '../card/card.component'
import { SearchComponent } from '../search/search.component'
import { SpinnerComponent } from '../spinner/spinner.component'

import { Movie } from '../../models/movie.model'
import { HotToastService } from '@ngxpert/hot-toast'

import { TmdbApiService } from '../../services/tmdb-api.service'
import { AppwriteService } from '../../services/appwrite.service'

@Component({
  selector: 'app-home',
  imports: [CardComponent, SearchComponent, CommonModule, SpinnerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  movies: Movie[] = []
  error: string = ""
  isLoading: boolean = false
  query: string = ""

  private searchSubject = new Subject<string>()

  constructor(
    private tmdbService: TmdbApiService,
    private appwriteService: AppwriteService,
    private toast: HotToastService
  ) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => {
        this.isLoading = true
        return this.tmdbService.fetchMovies(query)
      })
    ).subscribe({
      next: (data: any) => {
        this.movies = data.results
        this.isLoading = false
        if (this.query && data.results.length > 0) {
          console.log(this.query, data.results[0])
          this.appwriteService.updateSearchCount(this.query, data.results[0])
        }
        console.log("From app.component.js: ", data)
      },
      error: (err: string) => {
        console.log('API error:', err)
        this.error = 'Problem fetching movies, Try again later'
        this.toast.error('Problem fetching movies, Try again later')
        this.isLoading = false
      }
    })
    this.fetchMovies('')
  }

  setQuery(val: string) {
    this.searchSubject.next(val)
  }

  fetchMovies(query: string) {
    this.isLoading = true
    this.tmdbService.fetchMovies(query).subscribe({
      next: (data: any) => {
        this.movies = data.results
        this.isLoading = false
      },
      error: (err: string) => {
        console.log('API error:', err)
        this.error = 'Problem fetching movies, Try again later'
        this.toast.error("Problem fetching movies, Try again later")
        this.isLoading = false
      }
    })
  }
}
