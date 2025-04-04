import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { LucideAngularModule, Bookmark } from 'lucide-angular';

import { createBookmark } from '../../../appwrite';

@Component({
  selector: 'app-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './card.component.html',
})
export class CardComponent {

  isSaved: boolean = false

  readonly Bookmark = Bookmark

  @Input() movie!: { id: string; title: string; poster_path: string; vote_average: number; release_date: string; original_language: string }

  hasLiked: boolean = false
  likesCount: number = 0

  handleLike() {
    // console.log(this.title, "has been liked", !this.hasLiked)
    this.likesCount += this.hasLiked ? -1 : 1
    return this.hasLiked = !this.hasLiked
  }

  handleBookmark() {
    if (this.isSaved !== true) {
      createBookmark(this.movie)
    }
    this.isSaved = !this.isSaved
  }

}
