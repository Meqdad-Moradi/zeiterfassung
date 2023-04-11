import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  panelOpenState = false;
  startTime!: Date;
  endTime!: Date;
  timeWorked!: number;

  timeStarted: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private getTimesService: GetTimesService
  ) {}

  ngOnInit(): void {}

  // startTime(): void {
  //   // this.time = this.datePipe.transform(new Date(), 'h:mm')!;
  //   // this.date = this.datePipe.transform(new Date(), 'dd.MM.yyyy')!;
  // }

  startTimer() {
    this.startTime = new Date();
    this.timeStarted = true;
  }

  stopTimer() {
    this.endTime = new Date();
    this.timeWorked = this.endTime.getTime() - this.startTime.getTime();
    this.getTimesService.addTime(this.timeWorked);
    this.timeStarted = false;
  }
}
