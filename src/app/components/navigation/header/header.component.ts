import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultComponent } from '../../dialogs/result/result.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  showTotalTime(): void {
    this.dialog.open(ResultComponent, {
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
