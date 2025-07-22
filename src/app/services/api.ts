import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  data: T[];
  meta?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  // Generic GET method
  get<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
  }

  // Example: Get all projects
  getProjects() {
    return this.get<any>('projects');
  }

  // Get one project by ID
  getProject(id: number) {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`);
  }

  getTimeEntries() {
    return this.get<any>('time-entries');
  }

  getLeaveTickets() {
    return this.get<any>('leave-tickets');
  }

  getVacationSummary() {
    return this.get<any>('vacation-summary');
  }

  getLandingPage() {
    return this.get<any>('landing-page'); // usually only 1 entry
  }
}