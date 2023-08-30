import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { AuthService } from '../auth.service';
import { UserStateService } from '../shared/user-state.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent {
  books: any[] = [];
  loggedInUser: any;
  
  constructor(
    private bookService: BookService,
    private userStateService: UserStateService
  ) {}

  ngOnInit(): void{
    this.loggedInUser = this.userStateService.getUser();

    
    if (this.loggedInUser && this.loggedInUser.roles.some((role: any) => role.name === 'author')) {
      console.log('[user]', this.loggedInUser);
      
      this.loadAuthorBooks(this.loggedInUser.id);
    }
  }

  loadAuthorBooks(authorId: number): void {
    // Call your book service to fetch the author's books
    this.bookService.getAuthorBooks(authorId).subscribe((data: any) => {
      if (data.status === 'success') {
        this.books = data.data;
      }
    });
  }

}
