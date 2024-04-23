import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import {enGbLocale} from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BookServiceService } from '../Shared/Services/book-service.service';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent {
  editBookForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  model: any = {};
  routeSub: any;
  bookId: any;
  submitted = false;
  bsConfig: Partial<BsDatepickerConfig> | undefined;
  maxDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private bookService :BookServiceService
  ) {
    enGbLocale.invalidDate = 'Custom label';
    defineLocale('custom locale', enGbLocale); 
    this.localeService.use('custom locale');

    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY',
    };
  }
  ngOnInit(): void {
    this.initForm();
    this.routeSub = this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    this.GetBookDetails();
  }
  UpdateBookData() {}

  GetBookDetails() {
    this.bookService.GetBookById(this.bookId)
      .subscribe({
        next: (response: any) => {
          debugger;
          this.editBookForm.patchValue({
            name: response.name,
            description: response.description,
            publishedDate: new Date(response.publishedDate),
          });
        },
        error: (response) => {},
      });
  }

  initForm() {
    this.editBookForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      publishedDate: [Date,[Validators.required]],
    });
  }

  register() {
    if (!this.editBookForm.valid) {
      this.submitted = true;
      return;
    }
    console.log(this.editBookForm);
    this.model = { ...this.editBookForm.value , id : this.bookId};

    this.bookService.UpdateBookById(this.model)
      .subscribe({
        next: (response: any) => {
          debugger;
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
