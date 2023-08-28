// book-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules
import { BookService } from '../book.service';
import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup; 
  authors : Author[] = [];
  selectedFile: File | null = null;
  
  constructor(
    private fb: FormBuilder, 
    private bookService: BookService,
    private authorService: AuthorService,
    ) {
     this.bookForm = this.fb.group({
      author_id: ['', Validators.required],
      name: ['', Validators.required],
      published_date: ['', Validators.required],
      image_path: [''] 
    });
   }

  ngOnInit(): void {
      this.authorService.getAuthors().subscribe((data) => {
        this.authors = data.data
      })    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  submitForm() {
    if (this.bookForm.valid) {
      const formData = new FormData;

      formData.append('name', this.bookForm.get('name')?.value);
      formData.append('author_id', this.bookForm.get('author_id')?.value);
      formData.append('published_date', this.bookForm.get('published_date')?.value);
      formData.append('cover_image', this.selectedFile || ''); // Add the selected file

      this.bookService.addBook(formData).subscribe(response => {
        
      });
    }
  }
}
