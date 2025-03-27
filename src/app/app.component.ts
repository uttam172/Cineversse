import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  imports: [CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  movies = [
    {img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrLJft4VVUx9GqrcJQkgxvZwG394uFAey-g&s", name:'Lost In Space', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."}, 
    {img: "abc", name:'Bagheera', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."}, 
    {img: "abc", name:'Spiderman', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
    {img: "abc", name:'Spiderman', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
    {img: "abc", name:'Spiderman', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
  ]
}
