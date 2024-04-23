import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateNewBookComponent } from './create-new-book/create-new-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { ListAllBooksComponent } from './list-all-books/list-all-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateNewBookComponent,
    UpdateBookComponent,
    ListAllBooksComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    ToastrModule.forRoot(),
    MatDialogModule ,
    BsDatepickerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
