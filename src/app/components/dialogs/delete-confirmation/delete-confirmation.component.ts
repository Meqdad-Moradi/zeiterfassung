import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: boolean,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteTime(): void {
    this.snackbar.openFromComponent(ToasterComponent, {
      data: 'Die Zeit wurde erfolgreich geslöscht!',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
