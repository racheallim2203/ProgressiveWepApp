import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  // The ngOnInit method is a callback method which gets called when the Angular finishes initializing the component's view,
  ngOnInit(): void {
    this.listCategory();
  }

  listCategory() {

    /* The subscribe() method is used to subscribe to this observable, 
    which means the code inside the subscription will be executed once the observable emits a value 
    (or in the context of HttpClient, when the HTTP request completes).*/
    
    this.dbService.listCategory().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err) => {this.router.navigate(["/invalid-data"])}
    })
  }
  

  deleteCategory(categoryId: any) {
    console.log('Delete function triggered for category with ID:', categoryId);
    
    // Calls a method from DatabaseService to delete a category on the server side. It returns an Observable (categoryId).
    this.dbService.deleteCategory(categoryId).subscribe({
      next: (result: any) => {

        // After successful deletion, filter out the deleted record from the records array
        this.records = this.records.filter(record => record.categoryId !== categoryId);
      },
      
      error: (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    })
  }
}
