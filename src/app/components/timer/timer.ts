import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TimerService } from './timer.service';
import { Hourglass } from "../hourglass/hourglass";

@Component({
  selector: 'app-timer',
  imports: [
    CommonModule,
    MatIcon,
    Hourglass
],
  templateUrl: './timer.html',
  styleUrl: './timer.css'
})
export class Timer  implements OnInit {
    startTime: number | null = null;
  elapsedTime: number = 0;
  timerInterval: any;
  progress: number = 0;
  duration: number = 60; 
  isRunning: boolean = false;
  @Output() timerStarted = new EventEmitter<void>();
  @Output() timerStopped = new EventEmitter<void>();
  @Output() progressChange = new EventEmitter<number>();
breakTime: any;
workTime: any;

  constructor(private snackBar: MatSnackBar, private timerService: TimerService) {}

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
