import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MovieService } from '../../services/movie.service'
import { Movie } from '../../models/movie.model'
import { CardComponent } from '../card/card.component'
import { LucideAngularModule, Trash2, PenSquare } from 'lucide-angular'

@Component({
  selector: 'app-add-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, LucideAngularModule],
  templateUrl: './add-movies.component.html',
})
export class AddMoviesComponent implements OnInit {

  readonly Trash2 = Trash2
  readonly PenSquare = PenSquare

  movie: Movie = this.getEmptyMovie()
  movies: Movie[] = []
  isEditing = false
  validImageUrl = false

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies()
  }

  getEmptyMovie(): Movie {
    return { id: 0, title: '', poster_path: '', vote_average: 0, release_date: '', original_language: '' }
  }

  clearForm(movieForm: any) {
    this.movie = this.getEmptyMovie()
    movieForm.resetForm()
    this.isEditing = false
    this.validImageUrl = false
  }

  updateImagePreview() {
    this.validImageUrl = !!this.movie.poster_path
  }

  getMoviePoster(): string {
    return this.movie.poster_path?.startsWith('http')
      ? this.movie.poster_path
      : this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
      : './no-movie.png'
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => (this.movies = data))
  }

  getSelectedMovie(id: number) {
    this.isEditing = true
    this.movieService.getSelectedMovie(id).subscribe((data) => {
      this.movie = { ...data, id: data.id ?? null }
      this.updateImagePreview()
    })
  }

  submitMovie(movieForm: any) {
    const operation = this.isEditing ? this.movieService.editMovie(this.movie) : this.movieService.addMovie(this.movie)
    
    operation.subscribe(() => {
      this.getMovies()
      this.clearForm(movieForm)
    })
  }

  removeMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(movie => movie.id !== id)
    })
  }
  
}
