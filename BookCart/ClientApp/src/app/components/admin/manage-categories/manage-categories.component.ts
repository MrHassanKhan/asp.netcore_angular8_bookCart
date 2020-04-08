import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['categoryId', 'categoryName', 'operation'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.getAllCategoryData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllCategoryData() {
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.dataSource.data = Object.values(data);
      }, error => {
        console.log('Error ocurred while fetching Category details : ', error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    // const dialogRef = this.dialog.open(DeleteBookComponent, {
    //   data: id
    // });

    // dialogRef.afterClosed()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(result => {
    //     if (result === 1) {
    //       this.getAllCategoryData();
    //       this.snackBarService.showSnackBar('Data deleted successfully');
    //     } else {
    //       this.snackBarService.showSnackBar('Error occurred!! Try again');
    //     }
    //   });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
