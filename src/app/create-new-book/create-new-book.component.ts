import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-book',
  templateUrl: './create-new-book.component.html',
  styleUrl: './create-new-book.component.css',
})
export class CreateNewBookComponent implements OnInit {
  createBookForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  model: any = {};
  submitted = false;
  bsConfig: Partial<BsDatepickerConfig> | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private toastr: ToastrService
  ) {this.bsConfig = {
    containerClass: 'theme-red',
    dateInputFormat: 'DD MMMM YYYY',
  };}
  ngOnInit(): void {
    this.initForm();
  }
  CreateNewBook() {}

  initForm() {
    this.createBookForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      publishedDate: ['', [Validators.required]],
    });
  }

  register() {
    if(!this.createBookForm.valid) {
      this.submitted = true;
      return;
    }
    console.log(this.createBookForm);
    this.model = { ...this.createBookForm.value };
   
    this.httpClient
      .post('https://localhost:44304/api/Books', this.model)
      .subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.toastr.success(response.message);
            this.router.navigateByUrl('/books');
          } else {
            this.toastr.error(response.message);
            this.validationErrors = response.message;
          }
        },
        error: (response) => {
          this.toastr.error(response.message);
          this.validationErrors = response;
        },
      });
  }
  cancel() {
    this.router.navigateByUrl('/books');
    console.log(this.model);
  }
}
