import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ITotalTimes } from 'src/app/modules/times';
import { GetTimesService } from 'src/app/services/get-times.service';
import { ResultComponent } from '../../dialogs/result/result.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalTime!: Observable<ITotalTimes>;
  readResult = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialog,
    private getTimesService: GetTimesService
  ) {}

  ngOnInit(): void {
    this.totalTime = this.readResult.pipe(
      switchMap(() => this.getTimesService.getTotalHoursMinutes())
    );
  }

  showTotalTime(): void {
    this.dialog.open(ResultComponent, {
      data: this.totalTime,
    });

    this.readResult.next(true);
  }
}
