import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dates!: Observable<any>;

  constructor(private getTimeService: GetTimesService) {}

  ngOnInit(): void {
    this.dates = this.getTimeService.fetchTime();
  }
}
