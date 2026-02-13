import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TimeEntry interface matching the Spring Boot backend model
export interface TimeEntry {
  id?: number;
  email: string;
  project: string;
  startTime: string | Date;
  endTime?: string | Date;
  notes?: string;
}

export interface ApiResponse<T> {
  data: T[];
  meta?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Using relative URLs that will be proxied to the backend
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  // ===== TIME ENTRIES =====
  getTimeEntries(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.baseUrl}/time-entries`);
  }

  getTimeEntriesByEmail(email: string): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.baseUrl}/time-entries/email/${email}`);
  }

  getTimeEntry(id: number): Observable<TimeEntry> {
    return this.http.get<TimeEntry>(`${this.baseUrl}/time-entries/${id}`);
  }

  createTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.baseUrl}/time-entries`, entry);
  }

  updateTimeEntry(id: number, entry: TimeEntry): Observable<TimeEntry> {
    return this.http.put<TimeEntry>(`${this.baseUrl}/time-entries/${id}`, entry);
  }

  deleteTimeEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/time-entries/${id}`);
  }

  // ===== PROJECTS (Strapi) =====
  getProjects() {
    return this.http.get<any>(`${this.baseUrl}/projects`);
  }

  getProject(id: number) {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`);
  }

  // ===== LEAVE TICKETS (Strapi) =====
  getLeaveTickets() {
    return this.http.get<any>(`${this.baseUrl}/leave-tickets`);
  }

  // ===== VACATION SUMMARY (Strapi) =====
  getVacationSummary() {
    return this.http.get<any>(`${this.baseUrl}/vacation-summary`);
  }

  // ===== LANDING PAGE (Strapi) =====
  getLandingPage() {
    return this.http.get<any>(`${this.baseUrl}/landing-page`); 
  }
}