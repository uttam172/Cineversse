import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardComponent } from '../card/card.component';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-bookmarks',
  imports: [CardComponent],
  templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent {

  movies: Movie[] = []

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any) => {
      this.movies = data
    })
  }
}
