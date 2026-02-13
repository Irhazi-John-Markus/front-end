import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-save-time-entry-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Save Time Entry</h2>
      
      <div mat-dialog-content class="dialog-content">
        <p class="time-display">Elapsed Time: <strong>{{ data.formattedTime }}</strong></p>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="email" type="email" placeholder="your.email@example.com" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Project</mat-label>
          <input matInput [(ngModel)]="project" placeholder="Enter project name" minlength="3" required>
        </mat-form-field>
      </div>

      <div mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isFormValid()">
          Save Entry
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      min-width: 300px;
    }

    .dialog-content {
      padding: 20px 0;
    }

    .time-display {
      text-align: center;
      font-size: 16px;
      margin-bottom: 20px;
      color: #1976d2;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding-top: 20px;
    }

    h2 {
      margin: 0;
      color: #333;
    }
  `]
})
export class SaveTimeEntryDialogComponent {
  email: string = '';
  project: string = '';

  constructor(
    public dialogRef: MatDialogRef<SaveTimeEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isFormValid(): boolean {
    return this.email.length > 0 && 
           this.project.length >= 3 && 
           this.email.includes('@');
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.dialogRef.close({
        email: this.email,
        project: this.project
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
