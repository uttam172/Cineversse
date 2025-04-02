import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: 'profile', component: ProfileComponent},
    {path: 'bookmarks', component: BookmarksComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];
