import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../../../../shared/models/client.model';

export interface ClientFormData {
  client?: Client;
}

@Component({
  selector: 'app-client-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss'],
})
export class ClientFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientFormDialogComponent>);

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ClientFormData
  ) {
    this.form = this.fb.group({
      name: [data?.client?.name || '', Validators.required],
      email: [data?.client?.email || '', [Validators.required, Validators.email]],
      phone: [data?.client?.phone || '', Validators.required],
      company: [data?.client?.company || '', Validators.required],
      address: [data?.client?.address || ''],
    });
  }

  get title(): string {
    return this.data?.client ? 'Editar cliente' : 'Agregar cliente';
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
