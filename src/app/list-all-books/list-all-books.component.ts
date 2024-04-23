import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { BookServiceService } from '../Shared/Services/book-service.service';

@Component({
  selector: 'app-list-all-books',
  templateUrl: './list-all-books.component.html',
  styleUrl: './list-all-books.component.css',
})
export class ListAllBooksComponent implements OnInit {
  books: any;
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private booksService: BookServiceService
  ) {}

  ngOnInit(): void {
    this.GetAllBooks();
  }

  GetAllBooks() {
    this.booksService.GetAllBooks().subscribe({
      next: (response) => (this.books = response),
      error: () => {},
      complete: () => {},
    });
  }
  DeleteBookById(id: string): void {
    this.booksService.DeleteBookById(id).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.GetAllBooks();
      },
      error: (response: any) => {
        this.toastr.error(response.message);
      },
      complete: () => {},
    });
  }

  openDialog(bookId: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        debugger;
        this.DeleteBookById(bookId);
      }
    });
  }
}
