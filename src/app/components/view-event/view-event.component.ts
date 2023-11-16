import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  records: any = {};
  eventId: string = '';

  constructor(
    private dbService: DatabaseService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if (eventId) {
      this.eventId = eventId;
      this.getEventDetails();
    } else {
      this.router.navigate(["/invalid-data"]);
    }
  }

  getEventDetails(): void {
    this.dbService.viewEvent(this.eventId).subscribe({
      next: (data: any) => {
        this.records = data; 
      },
      error: (err) => {
        console.error("Error fetching event details:", err);
        this.router.navigate(["/invalid-data"]);
      }
    });
  }
}