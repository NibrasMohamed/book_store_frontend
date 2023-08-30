import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { BookFormComponent } from './book-form/book-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';
import { roleGuard } from './shared/role.guard';
import { BooksTableComponent } from './books-table/books-table.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'authors', component: AuthorListComponent, canActivate: [authGuard, roleGuard] , data: { roles:['admin']}},
  { path: 'books', component: BookListComponent},
  { path: 'books/list', component: BooksTableComponent, canActivate: [authGuard, roleGuard] , data: { roles:['author']} },
  { path: 'authors/add', component: AuthorFormComponent, canActivate: [authGuard, roleGuard] , data: { role:'admin'}},
  { path: 'books/add', component: BookFormComponent, canActivate: [authGuard, roleGuard] , data: { roles:['author', 'admin']}},
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
