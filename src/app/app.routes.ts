import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { AddMoviesComponent } from './components/add-movies/add-movies.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add-movies', component: AddMoviesComponent},
    {path: 'bookmarks', component: BookmarksComponent},
];
