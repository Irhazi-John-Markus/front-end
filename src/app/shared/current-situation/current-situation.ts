import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilter } from "../search-filter/search-filter";


@Component({
  selector: 'app-current-situation',
  imports: [
    CommonModule, SearchFilter],
  templateUrl: './current-situation.html',
  styleUrl: './current-situation.css'
})
export class CurrentSituation {
    results: any[] = [
    { date: '2025-01-01', entry: '08:00', exit: '16:00', duration: '08:00', workedHours: '08:00', overtime: '00:00' },
    { date: '2025-01-02', entry: '09:00', exit: '17:00', duration: '08:00', workedHours: '08:00', overtime: '00:00' },
    { date: '2025-01-03', entry: '08:30', exit: '15:30', duration: '07:00', workedHours: '07:00', overtime: '00:00' },
    { date: '2025-01-04', entry: '10:00', exit: null, duration: null, workedHours: null, overtime: null },
  ];

  filteredResults: any[] = [...this.results];

  applyFilter(filter: { search: string, date: Date, status: string }) {
    this.filteredResults = this.results.filter(item => {
      const searchLower = filter.search.toLowerCase();
      const matchesSearch = searchLower
        ? item.name.toLowerCase().includes(searchLower)
        : true;

      const matchesDate = filter.date
        ? new Date(item.date).toDateString() === filter.date.toDateString()
        : true;

      const matchesStatus = filter.status && filter.status !== 'all'
        ? item.status === filter.status
        : true;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }

  edit(result: any) {
    const newEntry = prompt('Enter new entry time (HH:mm):', result.entry);
    if (newEntry) {
      result.entry = newEntry;
    }

    const newExit = prompt('Enter new exit time (HH:mm):', result.exit);
    if (newExit) {
      result.exit = newExit;
    }

    if (result.entry && result.exit) {
      const entryTime = new Date(`1970-01-01T${result.entry}:00`);
      const exitTime = new Date(`1970-01-01T${result.exit}:00`);
      const durationMs = exitTime.getTime() - entryTime.getTime();
      const durationHours = durationMs / (1000 * 60 * 60);

      result.duration = durationHours.toFixed(2);
      result.workedHours = result.duration; 
      result.overtime = (durationHours > 8 ? (durationHours - 8).toFixed(2) : '00:00');
    }

    console.log('Updated result:', result);
  }
}
