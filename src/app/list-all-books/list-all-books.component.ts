import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

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
    private router : Router
  ) {}

  ngOnInit(): void {
    this.GetAllBooks();
  }

  GetAllBooks() {
    this.httpClient.get('https://localhost:44304/api/Books').subscribe({
      next: (response) => (this.books = response),
      error: () => {},
      complete: () => {},
    });
  }
  DeleteBookById(id: string): void {
    this.httpClient
      .delete(`https://localhost:44304/api/Books/${id}`)
      .subscribe({
        next: (response : any) => {
          this.toastr.success(response.message);
          this.GetAllBooks();
        },
        error: (response:any) => {this.toastr.error(response.message)},
        complete: () => {},
      });
  }
  
  openDialog(bookId : string) {
    const dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        debugger;
       this.DeleteBookById(bookId);
      }
  });
}
}
