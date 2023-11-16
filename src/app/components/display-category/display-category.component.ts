import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent implements OnInit {
  records: any = {};
  categoryId: string = '';

  constructor(
    private dbService: DatabaseService, 
    private router: Router,

    // ActivatedRoute allows the component to access the route parameters.
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    // When the DisplayCategoryComponent is initialized, 
    // it requires the categoryId parameter from the URL to fetch and display the relevant category details.
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId) {
      this.categoryId = categoryId;
      this.fetchCategoryDetails();
    } else {
      this.router.navigate(["/invalid-data"]);
    }
  }

  fetchCategoryDetails(): void {
    this.dbService.getCategoryDetails(this.categoryId).subscribe({
      next: (data: any) => {
        this.records = data; 
      },
      error: (err) => {
        console.error("Error fetching category details:", err);
        this.router.navigate(["/invalid-data"]);
      }
    });
  }

  viewEvent(eventId: any) {
    console.log('View details function triggered for event with ID:', eventId);
  
    this.dbService.viewEvent(eventId).subscribe({
      next: (result: any) => {
        console.log("redirecting to view-event page")
        this.router.navigate(["/view-event"]);
      },
      error: (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    })
  }
  
}
