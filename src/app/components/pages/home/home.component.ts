import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<any>;
  dateSubscription!: Subscription;

  todayTime!: number;
  monthTime!: number;

  constructor(private getTimeService: GetTimesService) {}

  ngOnInit(): void {
    this.dateSubscription = this.getTimeService
      .fetchTime()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);
      });

    // this.todayTime = this.getTimeService.getTimeToday();
    // this.monthTime = this.getTimeService.getTimeThisMonth();
  }

  /**
   * calculate time difference
   * @param dateSent
   * @returns date difference
   */
  calculateTimeDiff(dateSent: any) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
