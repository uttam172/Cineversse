import { Component } from '@angular/core';

import { Movie } from '../../models/movie.model';

import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-bookmarks',
  imports: [CardComponent],
  templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent {

  movies: Movie[] = []

  constructor() { }

}
