import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  records: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.dbService.listEvent().subscribe({
      next: (data: any) => {
        this.records = data;
      },
      error: (err) => {this.router.navigate(["/invalid-data"])}
    })
  }

  viewEvent(eventId: any) {
    console.log("hello world")
    this.router.navigate([`/view-event/${eventId}`]);
  }
}
