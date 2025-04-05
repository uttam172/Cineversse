import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { AddMoviesComponent } from './pages/add-movies/add-movies.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'add-movies', component: AddMoviesComponent},
    {path: 'bookmarks', component: BookmarksComponent},
];
