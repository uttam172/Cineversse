import { CommonModule } from '@angular/common'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'

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

  @ViewChild('formSection') formSection!: ElementRef

  readonly Trash2 = Trash2
  readonly PenSquare = PenSquare

  movie: Movie = this.getEmptyMovie()
  movies: Movie[] = []
  isEditing = false
  validImageUrl = false
  formattedVote: string = ''

  constructor(private appwriteService: AppwriteService) { }

  ngOnInit() {
    this.getMovies()
  }


  // Form functions
  getEmptyMovie(): Movie {
    return { id: '', title: '', poster_path: '', vote_average: null, release_date: '', original_language: '' } as unknown as Movie
  }

  clearForm(movieForm: any) {
    this.movie = this.getEmptyMovie()
    movieForm.resetForm()
    this.isEditing = false
    this.validImageUrl = false
  }

  onVoteInput(event: Event) {
    const inputEl = event.target as HTMLInputElement;

    // Grab only digits from the input
    let raw = inputEl.value.replace(/\D/g, '');

    // Limit to max 2 digits
    if (raw.length > 2) {
      raw = raw.slice(0, 2);
    }

    let formatted = '';

    if (raw.length === 1) {
      formatted = `${raw[0]}.`;
    } else if (raw.length === 2) {
      formatted = `${raw[0]}.${raw[1]}`;
    }

    this.formattedVote = formatted;
    this.movie.vote_average = parseFloat(formatted || '0.0');
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


  // Movies CRUD functions
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
        console.log(data);
        this.movie = { ...data, id: data.id ?? null }
        this.updateImagePreview()
        setTimeout(() => {
          this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100)
      }, (err) => {
        console.error("Error Loading Movie", err)
      }
    )
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      const { id, ...movieData } = this.movie
      this.appwriteService.editMovie(id, movieData).subscribe(
        () => {
          this.getMovies()
          this.clearForm(movieForm)
        }, (err) => {
          console.error("Error Updating Movie", err)
        }
      )
    }
    console.log("Edit movie data: ", this.movie)
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
