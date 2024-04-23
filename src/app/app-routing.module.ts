import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewBookComponent } from './create-new-book/create-new-book.component';
import { AppComponent } from './app.component';
import { ListAllBooksComponent } from './list-all-books/list-all-books.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: ListAllBooksComponent },
  { path: 'books/createBook', component: CreateNewBookComponent },
  { path: 'books/editBook/:id', component: UpdateBookComponent },
  { path: '**', component: AppComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
