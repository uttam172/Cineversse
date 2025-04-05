import { CommonModule } from '@angular/common'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppwriteService } from '../../services/appwrite.service'

import { Movie } from '../../models/movie.model'

import { LucideAngularModule, Trash2, PenSquare } from 'lucide-angular'
import { HotToastService } from '@ngxpert/hot-toast'

import { SpinnerComponent } from '../spinner/spinner.component'

@Component({
  selector: 'app-add-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './add-movies.component.html',
})

export class AddMoviesComponent implements OnInit {

  @ViewChild('formSection') formSection!: ElementRef

  readonly Trash2 = Trash2
  readonly PenSquare = PenSquare

  movie: Movie = this.getEmptyMovie()
  movies: Movie[] = []

  validImageUrl = false
  formattedVote: string = ''

  isEditing = false
  isLoading: boolean = false
  error: string = ''

  constructor(
    private appwriteService: AppwriteService, 
    private toast: HotToastService
  ) { }

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

  onLangInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z]/g, '').substring(0, 2);
    this.movie.original_language = input.value;
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
    this.isLoading = true
    this.appwriteService.fetchMovie().subscribe(
      (data) => {
        this.movies = data
        this.isLoading = false
      }, (err) => {
        console.log("Error Loading Movies", err)
        this.toast.error("🚨 Could not fetch movies. Please try again.")
        this.error = "🚨 Could not fetch movies. Please try again."
        this.isLoading = false
      }
    )
  }

  getSelectedMovie(id: string) {
    this.isLoading = true
    this.isEditing = true
    this.appwriteService.fetchMovieById(id).subscribe(
      (data) => {
        this.movie = { ...data, id: data.id ?? null }
        this.updateImagePreview()
        setTimeout(() => {
          this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 100)
        this.isLoading = false
      }, (err) => {
        console.error("Error Loading Movie", err)
        this.toast.error("😔 Couldn't load selected movie.")
        this.error = "😔 Couldn't load selected movie."
        this.isLoading = false
      }
    )
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  submitMovie(movieForm: any) {
    if (movieForm.invalid) {
      this.toast.error('🚨 Hold up! Please fill in all required fields correctly before submitting.')
      return
    }
    this.isLoading = true
    if (!this.isEditing) {
      this.appwriteService.createMovie(this.movie).subscribe(
        () => {
          this.getMovies()
          this.clearForm(movieForm)
          this.toast.success("👏 Whoop whoop! Your movie has been added successfully 🎬 Let's roll credits!")
          this.isLoading = false
        }, (err) => {
          console.error("Error Submitting Movie", err)
          this.toast.error('Oops! Something went wrong while adding your movie. 😞 Try again in a moment!', err)
          this.error = 'Oops! Something went wrong while adding your movie. 😞 Try again in a moment!'
          this.isLoading = false
        }
      )
    } else if (this.isEditing) {
      const { id, ...movieData } = this.movie
      this.appwriteService.editMovie(id, movieData).subscribe(
        () => {
          this.getMovies()
          this.clearForm(movieForm)
          this.toast.success('🍿Boom! Your movie just got a glow-up — updated successfully!✨')
          this.isLoading = false
        }, (err) => {
          console.error("Error Updating Movie", err)
          this.toast.error('💔 Update mission failed. The movie refused a rewrite. Give it another take!', err)
          this.isLoading = false
        }
      )
    }
    this.isLoading = false
  }

  removeMovie(id: string) {
    this.isLoading = true
    this.appwriteService.deleteMovie(id).subscribe(
      () => {
        this.movies = this.movies.filter(movie => movie.id !== id)
        this.toast.success('✨Poof! Movie vanished like magic. Onward to better stories!')
        this.isLoading = false
      }, (err) => {
        console.error("Error Deleting Movie", err)
        this.toast.error("⚠️ Couldn't delete the movie! Server's playing hard to get.", err)
        this.error = "⚠️ Couldn't delete the movie! Server's playing hard to get."
        this.isLoading = false
      }
    )
  }

}

