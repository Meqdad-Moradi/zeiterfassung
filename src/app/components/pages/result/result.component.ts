import { Component, OnInit } from '@angular/core';
import { ITotalHoursAndMins } from 'src/app/modules/times';
import { GetTimesService } from 'src/app/services/get-times.service';
interface ITotalTimes {
  hour: string;
  mins: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  totalTimes!: ITotalTimes;

  constructor(private getTimesService: GetTimesService) {}

  ngOnInit(): void {
    const totalTimesResult = this.getTimesService.getTotalHoursMinutes();
    this.totalTimes = {
      hour: String(totalTimesResult.hour).padStart(2, '0'),
      mins: String(totalTimesResult.mins).padStart(2, '0'),
    };
  }
}
