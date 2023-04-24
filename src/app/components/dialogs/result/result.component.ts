import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITotalTimes } from 'src/app/modules/times';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  totalTime: any;

  /**
   * constructor
   * @param matDialogRef matDialogRef
   * @param data mat dialog data (hour & minutes)
   */
  constructor(
    private matDialogRef: MatDialogRef<ResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITotalTimes
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.totalTime = {
      hour: String(this.data.hour).padStart(2, '0'),
      mins: String(this.data.mins).padStart(2, '0'),
    };
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }
}
