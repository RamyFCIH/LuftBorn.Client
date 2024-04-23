import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private httpClient: HttpClient) {}
  baseUrl ='https://localhost:44304/api/Books';
  /// Get All Books
  GetAllBooks() {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  /// Getting Book Details By Its Id
  GetBookById(bookId: string) {
    return this.httpClient.get(
      `${this.baseUrl}/GetBookById/${bookId}`
    );
  }
  /// Create New Book
  CreateNewBook(model: any) {
    return this.httpClient.post(`${this.baseUrl}`, model);
  }
  /// Update Existing Book Data
  UpdateBookById(model : any) {
    return this.httpClient.put(`${this.baseUrl}`, model);
  }

  /// Delete Book By Its Id
  DeleteBookById(id : string) {
    return this.httpClient
      .delete(`${this.baseUrl}/${id}`);
  }
}
