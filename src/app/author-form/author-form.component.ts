import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent {
  authorForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authorService: AuthorService
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  submitForm() {
    if (this.authorForm.valid) {
      const formData = this.authorForm.value;
      this.authorService.addAuthor(formData).subscribe(response => {
        // Handle the response (e.g., show a success message)
      });
    }
  }
}
