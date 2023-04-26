import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITime } from 'src/app/modules/times';

@Component({
  selector: 'app-edit-time',
  templateUrl: './edit-time.component.html',
  styleUrls: ['./edit-time.component.scss'],
})
export class EditTimeComponent implements OnInit {
  startTime: string = '';
  endTime: string = '';
  id!: number;

  constructor(
    private matDialogRef: MatDialogRef<EditTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // set inputs value to edit start and end times
    this.data.forEach((date: ITime) => {
      this.startTime = date.startTime.split('T')[1].slice(0, 5);
      this.endTime = date.endTime.split('T')[1].slice(0, 5);
      this.id = date.id;
    });
  }

  // just close the dialog
  closeDialog(): void {
    this.matDialogRef.close();
  }
}
