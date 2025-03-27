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
    {img: "https://i.pinimg.com/736x/3a/5b/18/3a5b18b5c64584bf174a6809b4a43b99.jpg", name:'Aladdin', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."}, 
    {img: "https://i.pinimg.com/236x/01/ab/88/01ab8894c1bf33f4a0bb87b41c9d0839.jpg", name:'Wednesday', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."}, 
    {img: "https://i.pinimg.com/236x/87/e9/9e/87e99eb0661a04d5350105727ac3be23.jpg", name:'Avatar', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
    {img: "https://i.pinimg.com/236x/78/f0/2e/78f02e6a0ae0e2e86316224de52cd8df.jpg", name:'Moana', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
    {img: "https://i.pinimg.com/236x/06/8e/47/068e4700ce144ddfb8b5863b7b3eafd7.jpg", name:'Luka', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
    {img: "https://i.pinimg.com/236x/b0/16/60/b0166064857c210f7ddebfbbbebb0d7b.jpg", name:'Cinderella', content: "lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita delectus odit deserunt debitis accusamus sequi quae eum iure nam, cupiditate molestias incidunt unde veniam eaque corporis quisquam distinctio eveniet nisi."},
  ]
}

