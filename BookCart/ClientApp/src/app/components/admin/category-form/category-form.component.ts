import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  // book: Book = new Book();
  formTitle = 'Add';
  coverImagePath;
  categoryId;
  files;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {

    this.categoryForm = this.fb.group({
      categoryId: 0,
      categoryName: ['', Validators.required]
    });

    if (this.route.snapshot.params.id) {
      this.categoryId = this.route.snapshot.paramMap.get('id');
    }
  }

  get categoryName() {
    return this.categoryForm.get('categoryName');
  }

  ngOnInit() {
    if (this.categoryId) {
      this.formTitle = 'Edit';
      this.categoryService.getCategoryById(this.categoryId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result) => {
            this.setCategoryFormData(result);
          }, error => {
            console.log('Error ocurred while fetching book data : ', error);
          });
    }
  }

  saveBookData() {
    if (!this.categoryForm.valid) {
      return;
    }
    if (this.categoryId) {
      this.categoryService.updateCategoryDetails(this.categoryForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/admin/categories']);
          }, error => {
            console.log('Error ocurred while updating book data : ', error);
          });
    } else {
      this.categoryService.addCategory(this.categoryForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/admin/categories']);
          }, error => {
            // reset form and show a toaster
            this.categoryForm.reset();
            console.log('Error ocurred while adding book data : ', error);
          });
    }
  }

  cancel() {
    this.router.navigate(['/admin/books']);
  }

  setCategoryFormData(categoryFormData) {
    this.categoryForm.setValue({
      categoryId: categoryFormData.categoryId,
      categoryName: categoryFormData.categoryName,
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
