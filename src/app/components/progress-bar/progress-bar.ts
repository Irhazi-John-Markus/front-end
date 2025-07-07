import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css'
})
export class ProgressBar {
    private _progress: number = 0;

  @Input()
  set progress(value: number) {
    this._progress = Math.min(100, Math.max(0, Math.round(value))); 
  }

  get progress(): number {
    return this._progress;
  }
}
