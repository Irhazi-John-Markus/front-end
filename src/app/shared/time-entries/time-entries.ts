import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService, TimeEntry } from '../../services/api';

@Component({
  selector: 'app-time-entries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './time-entries.html',
  styleUrls: ['./time-entries.css']
})
export class TimeEntries implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  // Signals for reactive state
  timeEntries = signal<TimeEntry[]>([]);
  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  editingId = signal<number | null>(null);

  // Form
  form!: FormGroup;

  // Table columns
  displayedColumns: string[] = ['id', 'email', 'project', 'startTime', 'endTime', 'notes', 'actions'];

  ngOnInit(): void {
    this.initializeForm();
    this.loadDummyData();
    this.loadTimeEntries();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      project: ['', [Validators.required, Validators.minLength(3)]],
      startTime: ['', Validators.required],
      endTime: [''],
      notes: ['', Validators.maxLength(500)]
    });
  }

  loadDummyData(): void {
    const dummyEntries: TimeEntry[] = [
      {
        id: 1,
        email: 'johndoe@example.com',
        project: 'Project Alpha',
        startTime: new Date('').toISOString(), // Start: 9:00 AM
        endTime: new Date('').toISOString(), // End: 11:00 AM
        notes: ''
      },
      {
        id: 2,
        email: 'janedoe@example.com',
        project: 'Project Beta',
        startTime: new Date('').toISOString(), // Start: 11:30 AM
        endTime: new Date('').toISOString(), // End: 1:00 PM
        notes: ''
      },
      {
        id: 3,
        email: 'alice@example.com',
        project: 'Project Gamma',
        startTime: new Date('').toISOString(), // Start: 2:00 PM
        endTime: new Date('').toISOString(), // End: 5:00 PM
        notes: ''
      },

    ];

    // Set dummy data - will be replaced when real data loads
    this.timeEntries.set(dummyEntries);
  }

  loadTimeEntries(): void {
    this.isLoading.set(true);
    this.apiService.getTimeEntries().subscribe({
      next: (data) => {
        this.timeEntries.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading time entries:', err);
        this.snackBar.open('Failed to load time entries', 'Close', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (this.form.invalid) {
      // Log validation errors for debugging
      const errors = this.getFormErrors();
      console.error('Form validation errors:', errors);
      console.error('Form value:', this.form.value);
      this.snackBar.open(`Form errors: ${errors}`, 'Close', { duration: 5000 });
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.form.value;

    console.log('Form value before conversion:', formValue);

    // Convert datetime-local values to ISO format for backend
    const startTime = this.convertDateTimeToISO(formValue.startTime);
    const endTime = formValue.endTime ? this.convertDateTimeToISO(formValue.endTime) : null;

   
    const entry: any = {
      email: formValue.email,
      project: formValue.project,
      startTime: startTime || formValue.startTime, 
      notes: formValue.notes || ''
    };

    // Only add endTime if it has a value
    if (endTime) {
      entry.endTime = endTime;
    }

    console.log('Submitting entry:', entry);

    if (this.editingId()) {
      // Update existing entry
      this.apiService.updateTimeEntry(this.editingId()!, entry).subscribe({
        next: () => {
          this.snackBar.open('Time entry updated successfully!', 'Close', { duration: 3000 });
          this.form.reset();
          this.editingId.set(null);
          this.loadTimeEntries();
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Error updating time entry:', err);
          const errorMsg = err.error?.message || err.message || 'Failed to update time entry';
          this.snackBar.open(`Error: ${errorMsg}`, 'Close', { duration: 5000 });
          this.isSubmitting.set(false);
        }
      });
    } else {
      // Create new entry
      this.apiService.createTimeEntry(entry).subscribe({
        next: (response) => {
          console.log('Entry created successfully:', response);
          this.snackBar.open('Time entry created successfully!', 'Close', { duration: 3000 });
          this.form.reset();
          this.loadTimeEntries();
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Error creating time entry:', err);
          const errorMsg = err.error?.message || err.message || 'Failed to create time entry';
          this.snackBar.open(`Error: ${errorMsg}`, 'Close', { duration: 5000 });
          this.isSubmitting.set(false);
        }
      });
    }
  }

  editEntry(entry: TimeEntry): void {
    this.editingId.set(entry.id || null);
    this.form.patchValue({
      email: entry.email,
      project: entry.project,
      startTime: entry.startTime,
      endTime: entry.endTime,
      notes: entry.notes
    });
    // Scroll to form
    document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
  }

  deleteEntry(id: number): void {
    if (confirm('Are you sure you want to delete this time entry?')) {
      this.apiService.deleteTimeEntry(id).subscribe({
        next: () => {
          this.snackBar.open('Time entry deleted successfully!', 'Close', { duration: 3000 });
          this.loadTimeEntries();
        },
        error: (err) => {
          console.error('Error deleting time entry:', err);
          this.snackBar.open('Failed to delete time entry', 'Close', { duration: 3000 });
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  formatDateTime(value: any): string {
    if (!value) return '-';
    const date = new Date(value);
    return date.toLocaleString();
  }

  private convertDateTimeToISO(dateTimeValue: any): string | null {
    if (!dateTimeValue) return null;

    // If it's already a string in ISO format, return it
    if (typeof dateTimeValue === 'string') {
      if (dateTimeValue.includes('T')) {
        // It's a datetime-local string like "2026-02-13T10:30"
        // Convert to ISO string
        try {
          const date = new Date(dateTimeValue + ':00'); // Add seconds if missing
          return date.toISOString();
        } catch (e) {
          console.error('Error converting datetime:', dateTimeValue, e);
          return dateTimeValue; // Return as is if conversion fails
        }
      }
      return dateTimeValue;
    }

    // If it's a Date object
    if (dateTimeValue instanceof Date) {
      return dateTimeValue.toISOString();
    }

    // Fallback
    return dateTimeValue;
  }

  private getFormErrors(): string {
    const errors: string[] = [];
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.errors) {
        const errorMsg = Object.keys(control.errors).join(', ');
        errors.push(`${key}: ${errorMsg}`);
      }
    });
    return errors.length > 0 ? errors.join(' | ') : 'Unknown validation error';
  }
}
