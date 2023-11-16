import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  // An array to store categories fetched from the database.
  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.listCategory();
  }

  listCategory() {
    this.dbService.listCategory().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err) => {this.router.navigate(["/invalid-data"])}
    })
  }

  //  An object to hold the data of the category selected for updating.
selectedCategory: any = {};

updateCategory(categoryId: any) {
  // Grabbing the category to be updated based on the passed categoryId
  this.selectedCategory = this.records.find(cat => cat.categoryId === categoryId);
}

submitChanges() {
  this.dbService.updateCategory(
    this.selectedCategory.categoryId,
    this.selectedCategory.categoryName,
    this.selectedCategory.categoryDescription,
    this.selectedCategory.categoryImage
  ).subscribe(
    response => {
      console.log(response);
      // Refresh the category list after the update
      this.listCategory();
      // Clear the selectedCategory to hide the edit form
      this.selectedCategory = {};
    },
    error => {this.router.navigate(["/invalid-data"])}
  );
}
}