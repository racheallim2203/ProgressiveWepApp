import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-stats-g2',
  templateUrl: './stats-g2.component.html',
  styleUrls: ['./stats-g2.component.css']
})
export class StatsG2Component implements OnInit {
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