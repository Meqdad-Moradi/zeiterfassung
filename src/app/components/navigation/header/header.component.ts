import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isTimeTrackingOpen: boolean = false;
  time!: string;
  date!: string;
  panelOpenState = false;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  startTime(): void {
    this.time = this.datePipe.transform(new Date(), 'h:mm')!;
    this.date = this.datePipe.transform(new Date(), 'dd.MM.yyyy')!;
  }
}
