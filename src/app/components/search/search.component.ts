import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  query: string = ""

  @Output() queryChange = new EventEmitter<string>()

  onChange(e: Event) {
    this.query = (e.target as HTMLInputElement).value
    this.queryChange.emit(this.query)
  }

}
