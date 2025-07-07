import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private elapsedTimeSubject = new BehaviorSubject<number>(0);
  elapsedTime$ = this.elapsedTimeSubject.asObservable();

  setElapsedTime(time: number) {
    this.elapsedTimeSubject.next(time);
  }
}