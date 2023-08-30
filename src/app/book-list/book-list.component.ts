import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
   books: Book[] = [];
   storage_path: string =environment.storage_url;
   searchText: string = '';

   constructor(private bookService: BookService){}

   ngOnInit():any{
      this.getBooks()
   }

   getBooks(){
    this.bookService.getBooks(this.searchText).subscribe((data)=>{
      this.books = data.data;
    })
   }
   searchBooks() {
      this.getBooks();
    }
}
