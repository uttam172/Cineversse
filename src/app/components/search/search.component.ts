import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @Input() query!: string 
  @Input() setQuery!: (val:string) => void 
  // @Output() setQuery = new EventEmitter<void>()

  onChange(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value
    this.setQuery(inputValue)
  }

}
