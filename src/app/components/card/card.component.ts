import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title: string = ""
  @Input() content: string | undefined = ""
  @Input() imgUrl: string | null = null

  hasLiked: boolean = false
  likesCount: number = 0

  handleLike() {
    console.log(this.title, "has been liked", !this.hasLiked)
    this.likesCount += this.hasLiked? -1 : 1
    return this.hasLiked =!this.hasLiked
  }

}
