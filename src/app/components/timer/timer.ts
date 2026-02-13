import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TimerService } from './timer.service';
import { Hourglass } from "../hourglass/hourglass";
import { ApiService, TimeEntry } from '../../services/api';
import { SaveTimeEntryDialogComponent } from './save-time-entry-dialog/save-time-entry-dialog.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule,
    Hourglass
],
  templateUrl: './timer.html',
  styleUrl: './timer.css'
})
export class Timer implements OnInit {
  private apiService = inject(ApiService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private timerService = inject(TimerService);

  startTime: number | null = null;
  elapsedTime: number = 0;
  timerInterval: any;
  progress: number = 0;
  duration: number = 60; 
  isRunning: boolean = false;
  isSaving: boolean = false;

  @Output() timerStarted = new EventEmitter<void>();
  @Output() timerStopped = new EventEmitter<void>();
  @Output() progressChange = new EventEmitter<number>();

  breakTime: any;
  workTime: any;

  ngOnInit() {
    const savedTime = localStorage.getItem('elapsedTime');
    if (savedTime) {
      this.elapsedTime = parseInt(savedTime, 10);
      this.progress = (this.elapsedTime / (this.duration * 1000)) * 100;
      this.timerService.setElapsedTime(this.elapsedTime);
    }
  }

  startTimer() {
    if (!this.startTime) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      console.log('Timer started at:', this.startTime);
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime!;
        this.progress = (this.elapsedTime / (this.duration * 1000)) * 100;
        this.progressChange.emit(this.progress);
        this.timerService.setElapsedTime(this.elapsedTime);
        console.log('Elapsed time:', this.elapsedTime);
      }, 1000);
      this.timerStarted.emit();
    }
  }

  stopTimer() {
    if (this.startTime) {
      clearInterval(this.timerInterval);
      this.startTime = null;
      this.isRunning = false;
      this.timerStopped.emit();
      localStorage.setItem('elapsedTime', this.elapsedTime.toString());
      this.snackBar.open('Time recorded successfully!', 'Close', {
        duration: 3000,
      });
      this.timerService.setElapsedTime(this.elapsedTime);
    }
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.startTime = null;
    this.elapsedTime = 0;
    this.progress = 0;
    this.isRunning = false;
    localStorage.removeItem('elapsedTime');
    this.progressChange.emit(this.progress);
    this.timerStopped.emit();
    this.timerService.setElapsedTime(this.elapsedTime);
  }

  openSaveDialog() {
    if (this.elapsedTime === 0) {
      this.snackBar.open('Please run the timer first before saving!', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(SaveTimeEntryDialogComponent, {
      width: '400px',
      disableClose: false,
      data: {
        elapsedTime: this.elapsedTime,
        formattedTime: this.getFormattedTime()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveTimeEntry(result.email, result.project);
      }
    });
  }

  private saveTimeEntry(email: string, project: string) {
    if (!email || !project || this.elapsedTime === 0) {
      this.snackBar.open('Please provide email and project name', 'Close', { duration: 3000 });
      return;
    }

    this.isSaving = true;

    // Calculate start and end times based on elapsed time
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - this.elapsedTime);

    const timeEntry: TimeEntry = {
      email,
      project,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      notes: `Time tracked: ${this.getFormattedTime()}`
    };

    console.log('Saving time entry:', timeEntry);

    this.apiService.createTimeEntry(timeEntry).subscribe({
      next: (response) => {
        console.log('Time entry saved successfully:', response);
        this.snackBar.open('✓ Time entry saved successfully!', 'Close', { duration: 4000 });
        this.resetTimer();
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error saving time entry:', err);
        const errorMsg = err.error?.message || err.message || 'Failed to save time entry';
        this.snackBar.open(`Error: ${errorMsg}`, 'Close', { duration: 5000 });
        this.isSaving = false;
      }
    });
  }

  getFormattedTime(): string {
    const totalSeconds = Math.floor(this.elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  getRemainingTime(): string {
    const totalSeconds = this.duration * 60 - Math.floor(this.elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
}
