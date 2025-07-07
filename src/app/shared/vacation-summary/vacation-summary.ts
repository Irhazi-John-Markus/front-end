import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface VacationRequest {
  id: number;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'approved' | 'rejected' | 'pending';
}
@Component({
  selector: 'app-vacation-summary',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './vacation-summary.html',
  styleUrl: './vacation-summary.css'
})
export class VacationSummary implements OnInit {
    totalDays: number = 30;
   usedDays: number = 10;
   remainingDays: number = this.totalDays - this.usedDays;

    startDate: Date | null = null;
  endDate: Date | null = null;

  vacationForm: FormGroup;
  vacationRequests: VacationRequest[] = [
    { id: 1, startDate: new Date('2025-01-01'), endDate: new Date('2025-01-05'), reason: 'Vacation', status: 'approved' },
    { id: 2, startDate: new Date('2025-02-10'), endDate: new Date('2025-02-15'), reason: 'Family Event', status: 'pending' }
  ];

  displayedColumns: string[] = ['startDate', 'endDate', 'reason', 'status', 'actions']; 

  constructor(private fb: FormBuilder) {
    this.vacationForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  get progress(): number {
    return (this.usedDays / this.totalDays) * 100;
  }

  applyDateFilter() {
    if (this.startDate && this.endDate) {
      this.vacationRequests = this.vacationRequests.filter(request => 
      request.startDate! >= this.startDate! && request.endDate! <= this.endDate!
      );
    }
    console.log('Filtering from', this.startDate, 'to', this.endDate);
  }

  submitRequest() {
    if (this.vacationForm.valid) {
      const startDate = this.vacationForm.value.startDate instanceof Date 
        ? this.vacationForm.value.startDate 
        : new Date(this.vacationForm.value.startDate);

      const endDate = this.vacationForm.value.endDate instanceof Date 
        ? this.vacationForm.value.endDate 
        : new Date(this.vacationForm.value.endDate);

      const newRequest: VacationRequest = {
        id: this.vacationRequests.length + 1,
        startDate: startDate,
        endDate: endDate,
        reason: this.vacationForm.value.reason,
        status: 'pending'
      };

      console.log('New Vacation Request:', newRequest); 
      this.vacationRequests.push(newRequest);
      this.vacationForm.reset();
    }
  }

  deleteRequest(id: number) {
    this.vacationRequests = this.vacationRequests.filter(request => request.id !== id);
  }
}
