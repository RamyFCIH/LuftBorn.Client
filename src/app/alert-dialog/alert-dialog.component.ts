import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class AlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {

  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
