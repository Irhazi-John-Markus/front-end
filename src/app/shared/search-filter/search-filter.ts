import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-filter',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.css'
})
export class SearchFilter {
    @Output() filterChange = new EventEmitter<{ search: string, date: Date, status: string }>();

  search: string = '';
  date: Date | null = null;
  status: string = 'all';
  totalWorkedHours: number = 0; 
timerService: any;

  constructor() {
    this.calculateTotalWorkedHours(); 
  }

  calculateTotalWorkedHours() {
  
    const summaryData = [
      { date: '2025-01-01', hoursWorked: 8 },
      { date: '2025-01-02', hoursWorked: 7.5 },
      { date: '2025-01-03', hoursWorked: 8 },
      { date: '2025-01-04', hoursWorked: 8.5 },
      { date: '2025-01-05', hoursWorked: 8 }
    ];

    this.totalWorkedHours = summaryData.reduce((total, entry) => total + entry.hoursWorked, 0);
    this.totalWorkedHours = 40; 
  }

  applyFilter(search: string) {
    this.search = search;
    this.emitFilterChange();
  }

  applyDateFilter(event: any) {
    this.date = event.value;
    this.emitFilterChange();
  }

  applyStatusFilter(event: any) {
    this.status = event.value;
    this.emitFilterChange();
  }

  emitFilterChange() {
    this.filterChange.emit({ search: this.search, date: this.date ?? new Date(), status: this.status });
  }
}
