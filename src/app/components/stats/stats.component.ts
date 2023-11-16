import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: any = {};

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.dbService.getStats().subscribe(
      (data: any) => {
        this.stats = data;
      },
      error => {
        console.error('Error fetching stats', error);
      }
    );
  }
}