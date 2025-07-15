import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TimerService } from '../../components/timer/timer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  elapsedTime: number = 0;

  // Analog Clock Hands
  @ViewChild('clockHour') clockHour!: ElementRef;
  @ViewChild('clockMinutes') clockMinutes!: ElementRef;
  @ViewChild('clockSeconds') clockSeconds!: ElementRef;

  // Digital Clock Text
  @ViewChild('textHour') textHour!: ElementRef;
  @ViewChild('textMinutes') textMinutes!: ElementRef;
  @ViewChild('textAmPm') textAmPm!: ElementRef;
  @ViewChild('dateDay') dateDay!: ElementRef;
  @ViewChild('dateMonth') dateMonth!: ElementRef;
  @ViewChild('dateYear') dateYear!: ElementRef;

  // Theme Toggle Button
  @ViewChild('themeButton') themeButton!: ElementRef;

  private clockInterval: any;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.elapsedTime$.subscribe((time: number) => {
      this.elapsedTime = time;
    });
  }

  ngAfterViewInit(): void {
    this.startClock();
    this.setupThemeToggle();
  }

  ngOnDestroy(): void {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }

  startClock(): void {
    this.updateClock(); // Initial call
    this.clockInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock(): void {
    const date = new Date();

    // Analog Clock Rotation
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * 6;
    const ss = date.getSeconds() * 6;

    this.clockHour.nativeElement.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    this.clockMinutes.nativeElement.style.transform = `rotateZ(${mm}deg)`;
    this.clockSeconds.nativeElement.style.transform = `rotateZ(${ss}deg)`;

    // Digital Time
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const minutes = date.getMinutes().toString().padStart(2, '0');

    this.textHour.nativeElement.innerHTML = `${hours}:`;
    this.textMinutes.nativeElement.innerHTML = minutes;
    this.textAmPm.nativeElement.innerHTML = ampm;

    // Date Info
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    this.dateDay.nativeElement.innerHTML = day;
    this.dateMonth.nativeElement.innerHTML = `${month},`;
    this.dateYear.nativeElement.innerHTML = year;
  }

  setupThemeToggle(): void {
    const darkTheme = 'dark-theme';
    const iconTheme = 'bxs-sun';

    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? 'dark' : 'light';

    const getCurrentIcon = () =>
      this.themeButton.nativeElement.classList.contains(iconTheme)
        ? 'bxs-sun'
        : 'bxs-moon';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
      this.themeButton.nativeElement.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme);
    }

    this.themeButton.nativeElement.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme);
      this.themeButton.nativeElement.classList.toggle(iconTheme);

      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    });
  }

  getFormattedTime(): string {
    const totalSeconds = Math.floor(this.elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}