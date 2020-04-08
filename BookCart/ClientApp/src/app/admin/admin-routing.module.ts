import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from '../components/admin/book-form/book-form.component';
import { ManageBooksComponent } from '../components/admin/manage-books/manage-books.component';
import { ManageCategoriesComponent } from '../components/admin/manage-categories/manage-categories.component';
import { CategoryFormComponent } from '../components/admin/category-form/category-form.component';

const adminRoutes: Routes = [
  {
    path: 'books',
    children: [
        { path: 'new', component: BookFormComponent },
        { path: ':id', component: BookFormComponent },
        { path: '', component: ManageBooksComponent }
    ],
  },
  { path: 'categories',
    children: [
        { path: 'new', component: CategoryFormComponent },
        { path: ':id', component: CategoryFormComponent },
        { path: '', component: ManageCategoriesComponent }
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
