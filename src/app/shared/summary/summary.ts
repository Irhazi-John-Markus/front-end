import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary',
  imports: [
    MatTabsModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class Summary {
    filter: { startDate: string | null; endDate: string | null } = {
    startDate: null,
    endDate: null,
  };

  results: any[] = [
    { date: '2025-09-01', entry: '08:00', exit: '10:00', duration: '02:00', workedHours: '02:00' },
    { date: '2025-09-02', entry: '15:00', exit: '17:00', duration: '02:00', workedHours: '02:00' },
    { date: '2025-09-03', entry: '15:30', exit: '17:30', duration: '02:00', workedHours: '02:00' },
  ];

  filteredResults: any[] = [...this.results];
  totalWorkedHours: string = '06:00';

  applyFilter(): void {
    if (this.filter.startDate && this.filter.endDate) {
      const startDate = new Date(this.filter.startDate);
      const endDate = new Date(this.filter.endDate);

      this.filteredResults = this.results.filter(result => {
        const resultDate = new Date(result.date);
        return resultDate >= startDate && resultDate <= endDate;
      });
    } else {
      this.filteredResults = [...this.results];
    }
  }

  editEntry(result: any): void {
    const newEntry = prompt('Enter new entry time (HH:mm):', result.entry);
    const newExit = prompt('Enter new exit time (HH:mm):', result.exit);

    if (newEntry) result.entry = newEntry;
    if (newExit) result.exit = newExit;

    if (result.entry && result.exit) {
      const entryTime = new Date(`1970-01-01T${result.entry}:00`);
      const exitTime = new Date(`1970-01-01T${result.exit}:00`);
      const durationMs = exitTime.getTime() - entryTime.getTime();
      const durationMinutes = durationMs / (1000 * 60);
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;

      result.duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      result.workedHours = result.duration;
    }

    this.calculateTotalWorkedHours();
  }

  deleteEntry(index: number): void {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.results.splice(index, 1);
      this.filteredResults = [...this.results];
      this.calculateTotalWorkedHours();
    }
  }

  createNewEntry(): void {
    const newDate = prompt('Enter the date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    const newEntry = prompt('Enter new entry time (HH:mm):', '08:00');
    const newExit = prompt('Enter new exit time (HH:mm):', '16:00');

    if (newDate && newEntry && newExit) {
      const entryTime = new Date(`1970-01-01T${newEntry}:00`);
      const exitTime = new Date(`1970-01-01T${newExit}:00`);
      const durationMs = exitTime.getTime() - entryTime.getTime();
      const durationMinutes = durationMs / (1000 * 60);
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;

      this.results.push({
        date: newDate,
        entry: newEntry,
        exit: newExit,
        duration: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        workedHours: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      });

      this.filteredResults = [...this.results];
      this.calculateTotalWorkedHours();
    }
  }

  calculateTotalWorkedHours(): void {
    const totalMinutes = this.results.reduce((sum, result) => {
      if (result.entry && result.exit) {
        const entryTime = new Date(`1970-01-01T${result.entry}:00`);
        const exitTime = new Date(`1970-01-01T${result.exit}:00`);
        const durationMs = exitTime.getTime() - entryTime.getTime();
        const durationMinutes = durationMs / (1000 * 60);
        return sum + durationMinutes;
      }
      return sum;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    this.totalWorkedHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
