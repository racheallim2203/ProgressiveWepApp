import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  categoryName: string = "";
  categoryDescription: string = "";
  selectedFile: File | null = null;

  // A constructor that injects instances of DatabaseService and Router into this component.
  constructor(private dbService: DatabaseService, private router: Router) {}

  // A lifecycle hook that runs after Angular initializes the component.
  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Creates a FormData object and appends entered/selected data to it (potentially a file).
  saveCategory() {
    const formData = new FormData();
    formData.append('categoryName', this.categoryName);
    formData.append('categoryDescription', this.categoryDescription);
    if (this.selectedFile) {
      formData.append('categoryImage', this.selectedFile, this.selectedFile.name);
    }
    

    // Uses dbService to send formData to the API.
    this.dbService.addCategory(formData).subscribe({
      next: (result) => { this.router.navigate(["/list-category"]) },
      error: (error) => { this.router.navigate(["/invalid-data"]) }
    });
  }

}