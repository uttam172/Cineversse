import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-add-movies',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movies.component.html',
})
export class AddMoviesComponent {

  movie = {
    id: null,
    title: '',
    poster_path: '',
    vote_average: null,
    release_date: '',
    original_language: ''
  }

  validImageUrl = false;

  updateImagePreview() {
    const img = new Image();
    img.src = this.movie.poster_path;
    img.onload = () => this.validImageUrl = true;
    img.onerror = () => this.validImageUrl = false;
  }

  submitForm() {
    console.log("Movie Data Submitted:", this.movie);
  }

}
