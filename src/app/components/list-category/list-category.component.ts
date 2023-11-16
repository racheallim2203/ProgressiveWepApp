import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.dbService.listCategory().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err) => {this.router.navigate(["/invalid-data"])}
    })
  }

  categoryDetails(categoryId: any){
    this.router.navigate([`/display-category/${categoryId}`]);
  }
}
