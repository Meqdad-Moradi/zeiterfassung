import { Component, OnInit } from '@angular/core';
import { GetTimesService } from 'src/app/services/get-times.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  totalTimes!: number;
  constructor(private getTimesService: GetTimesService) {}

  ngOnInit(): void {
    const total = this.getTimesService.getTotalHours();
    this.totalTimes = total.reduce(
      (acc: number, val: any) => (acc += val.hour),
      0
    );

    console.log(this.totalTimes);
  }
}
