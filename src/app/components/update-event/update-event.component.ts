import {
  Component,
  OnInit
} from '@angular/core';
import {
  DatabaseService
} from 'src/app/services/database.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.listEvent();
  }

  listEvent() {
    this.dbService.listEvent().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err) => {
        this.router.navigate(["/invalid-data"])
      }
    })
  }

  selectedEvent: any = {};

  updateEvent(eventId: any) {
    // Grabbing the category to be updated based on the passed categoryId
    this.selectedEvent = this.records.find(event => event.eventId === eventId);
  }

  submitChanges() {
    this.dbService.updateEvent(
      this.selectedEvent.eventId,
      this.selectedEvent.eventName,
      this.selectedEvent.eventCapacity
    ).subscribe(
      response => {
        console.log(response);
        // Refresh the category list after the update
        this.listEvent();
        // Clear the selectedCategory to hide the edit form
        this.selectedEvent = {};
      },
      error => {
        this.router.navigate(["/invalid-data"])
      }
    );
  }
}
