import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/category/';
  }

  getAllCategories() {
    return this.http.get(this.baseURL)
      .pipe(map(response => {
        return response;
      }));
  }

//   getCategories() {
//     return this.http.get(this.baseURL + 'GetCategoriesList')
//       .pipe(map(response => {
//         return response;
//       }));
//   }

  addCategory(category) {
    return this.http.post(this.baseURL, category)
      .pipe(map(response => {
        return response;
      }));
  }

  getCategoryById(id: number) {
    return this.http.get(this.baseURL + id)
      .pipe(map(response => {
        return response;
      }));
  }

//   getsimilarBooks(bookId: number) {
//     return this.http.get(this.baseURL + 'GetSimilarBooks/' + bookId)
//       .pipe(map(response => {
//         return response;
//       }));
//   }

  updateCategoryDetails(category) {
    return this.http.put(this.baseURL, category)
      .pipe(map(response => {
        return response;
      }));
  }

  deleteCategory(id) {
    return this.http.delete(this.baseURL + id)
      .pipe(map(response => {
        return response;
      }));
  }
}
