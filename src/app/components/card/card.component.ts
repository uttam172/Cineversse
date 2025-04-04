import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { LucideAngularModule, Bookmark } from 'lucide-angular';

import { AppwriteService } from '../../services/appwrite.service';

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

  constructor(private appwriteService:AppwriteService) {}

  handleLike() {
    // console.log(this.title, "has been liked", !this.hasLiked)
    this.likesCount += this.hasLiked ? -1 : 1
    return this.hasLiked = !this.hasLiked
  }

  handleBookmark() {
    if (this.isSaved !== true) {
      this.appwriteService.createBookmark(this.movie)
    }
    this.isSaved = !this.isSaved
  }

}
