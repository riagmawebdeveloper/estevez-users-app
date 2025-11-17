import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface AlertDialogData {
  title?: string;
  message: string;
  buttonText?: string;
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent {
  private dialogRef = inject(MatDialogRef<AlertDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  get title(): string {
    return this.data.title || 'Información';
  }

  get buttonLabel(): string {
    return this.data.buttonText || 'Aceptar';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
