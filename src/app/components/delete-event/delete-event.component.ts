import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {
  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.listEvent();
  }

  listEvent() {
    this.dbService.listEvent().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err) => {this.router.navigate(["/invalid-data"])}
    })
  }

  deleteEvent(eventId: any) {
    console.log('Delete function triggered for event with ID:', eventId);
  
    this.dbService.deleteEvent(eventId).subscribe({
      next: (result: any) => {
        // After successful deletion, filter out the deleted record from the records array
        this.records = this.records.filter(record => record.eventId !== eventId);

        // do I need to delete categories linked to this event as well ?
      },
      error: (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    })
  }
}