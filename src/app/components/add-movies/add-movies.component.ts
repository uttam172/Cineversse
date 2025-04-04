import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { MovieService } from '../../services/movie.service'
import { AppwriteService } from '../../services/appwrite.service'

import { Movie } from '../../models/movie.model'

import { LucideAngularModule, Trash2, PenSquare } from 'lucide-angular'

@Component({
  selector: 'app-add-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-movies.component.html',
})
export class AddMoviesComponent implements OnInit {

  readonly Trash2 = Trash2
  readonly PenSquare = PenSquare

  movie: Movie = this.getEmptyMovie()
  movies: Movie[] = []
  isEditing = false
  validImageUrl = false

  constructor(private movieService: MovieService, private appwriteService: AppwriteService) { }

  ngOnInit() {
    this.getMovies()
  }

  getEmptyMovie(): Movie {
    return { id: '', title: '', poster_path: '', vote_average: 0, release_date: '', original_language: '' }
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
    this.appwriteService.fetchMovie().subscribe(
      (data) => {
        this.movies = data
      }, (err) => {
        console.log("Error Loading Movies", err);
      }
    )
  }

  getSelectedMovie(id: string) {
    this.isEditing = true
    this.appwriteService.fetchMovieById(id).subscribe(
      (data) => {
        this.movie = { ...data, id: data.id ?? null }
        this.updateImagePreview()
      }, (err) => {
        console.error("Error Loading Movie", err)
      }
    )
  }

  submitMovie(movieForm: any) {
    if (!this.isEditing) {
      this.appwriteService.createMovie(this.movie).subscribe(
        () => {
          this.getMovies()
          this.clearForm(movieForm)
        }, (err) => {
          console.error("Error Submitting Movie", err)
        }
      )
    } else if (this.isEditing) {
      this.appwriteService.editMovie(this.movie.id, this.movie).subscribe(
        () => {
          this.getMovies()
          this.clearForm(movieForm)
        }, (err) => {
          console.error("Error Updating Movie", err)
        }
      )
    }
  }

  removeMovie(id: string) {
    this.appwriteService.deleteMovie(id).subscribe(
      () => {
        this.movies = this.movies.filter(movie => movie.id !== id)
      }, (err) => {
        console.error("Error Deleting Movie", err)
      }
    )
  }

}
