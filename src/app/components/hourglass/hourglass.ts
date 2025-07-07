import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hourglass',
  imports: [],
  templateUrl: './hourglass.html',
  styleUrl: './hourglass.css'
})
export class Hourglass implements OnChanges {
    @Input() duration: number = 60; 
  @Input() isRunning: boolean = false; 
  animationDuration: string = '60s'; 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['duration']) {
      this.animationDuration = `${this.duration}s`;
    }
  }
}
