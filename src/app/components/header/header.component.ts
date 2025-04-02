import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LucideAngularModule, Bookmark } from 'lucide-angular'

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  readonly Bookmark = Bookmark

}
