import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  getGreeting(): string {
    return 'Welcome';
  }
  formatDuration(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  }

  calculateTotalTime(entries: number[]): number {
    return entries.reduce((total, time) => total + time, 0);
  }
}