// book-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules
import { BookService } from '../book.service';
import { Author } from '../author';
import { AuthorService } from '../author.service';
import { UserStateService } from '../shared/user-state.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent{
  bookForm: FormGroup; 
  authors : Author[] = [];
  selectedFile: File | null = null;
  user: any = {};
  
  constructor(
    private fb: FormBuilder, 
    private bookService: BookService,
    private userStateService: UserStateService,
    ) {
     this.bookForm = this.fb.group({
      name: ['', Validators.required],
      published_date: ['', Validators.required],
      image_path: [''] 
    });
   }

  ngOnInit(): void {
        this.user = this.userStateService.getUser();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  submitForm() {
    if (this.bookForm.valid) {
      const formData = new FormData;

      formData.append('name', this.bookForm.get('name')?.value);
      formData.append('user_id', this.user?.id);
      formData.append('published_date', this.bookForm.get('published_date')?.value);
      formData.append('cover_image', this.selectedFile || ''); // Add the selected file

      this.bookService.addBook(formData).subscribe(response => {
        
      });
    }
  }
}
