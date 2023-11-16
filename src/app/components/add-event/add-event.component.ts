import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventName: String = "";
  eventDescription: String = "";
  eventDate: Date | undefined;
  eventDuration: Number = 0;
  eventImage: File | null = null;
  eventActive: boolean = true;
  eventCapacity: Number = 0;
  eventTicketQty: Number = 0;
  eventCategories: String = "";

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {}

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length) {
      this.eventImage = input.files[0];
    }
  }

  saveEvent() { 
    const eventData = new FormData(); // Create a new FormData object

    // Append all event properties to the FormData object
    eventData.append('eventName', String(this.eventName));
    eventData.append('eventDescription', String(this.eventDescription));
    eventData.append('eventDate', String(this.eventDate));
    eventData.append('eventDuration', String(this.eventDuration));
    eventData.append('eventActive', String(this.eventActive));
    eventData.append('eventCapacity', String(this.eventCapacity));
    eventData.append('eventTicketQty', String(this.eventTicketQty));
    eventData.append('eventCategories', String(this.eventCategories));
    
    if(this.eventImage) { // Only append image if it's not null
      eventData.append('eventImage', this.eventImage, this.eventImage.name);
    }

    this.dbService.addEvent(eventData).subscribe({
      next: (result) => { this.router.navigate(["/list-events"]) },
      error: (error) => { this.router.navigate(["/invalid-data"]) }
    })
  }
}
