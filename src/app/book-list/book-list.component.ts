import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
   books: Book[] = [];

   constructor(private bookService: BookService){}

   ngOnInit():any{
    this.bookService.getBooks('').subscribe((data)=>{
      this.books = data.data;
    })
   }
}
