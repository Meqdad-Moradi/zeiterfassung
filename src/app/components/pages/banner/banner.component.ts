import { Component, OnInit } from '@angular/core';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(private getTimesService: GetTimesService) {}

  ngOnInit(): void {}

  startTime(): void {
    this.getTimesService.startTrackingTime.next(true);
  }

  stopTime(): void {
    this.getTimesService.stopTrackingTime.next(true);
  }
}
