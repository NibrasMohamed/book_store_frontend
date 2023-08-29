import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { BookFormComponent } from './book-form/book-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  // { path: '', redirectTo: '/authors', pathMatch: 'full' },
  { path: 'home', component: AuthorListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'authors/add', component: AuthorFormComponent, canActivate: [authGuard] },
  { path: 'books/add', component: BookFormComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
