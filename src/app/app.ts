import { Component, HostListener, OnInit, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Footer } from '../../layout/footer/footer';
import { LeftSidebar } from '../../layout/left-sidebar/left-sidebar';
import { Hourglass } from "./components/hourglass/hourglass";
import { ProgressBar } from "./components/progress-bar/progress-bar";
import { Timer } from "./components/timer/timer";
import { Main } from "./main/main";
import { ApiService } from "./services/api"
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Footer,
    LeftSidebar,
    MatIconModule,
    MatButtonModule,
    Hourglass,
    ProgressBar,
    Timer,
    Main,
    RouterModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private apiService = inject(ApiService); 

  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  title = 'TimeTrack';
  isDarkTheme = localStorage.getItem('theme') === 'dark';

  landingData: any = null;

  constructor() {
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);

    // 🔽 Fetch data from Strapi
    this.apiService.getLandingPage().subscribe({
      next: (res) => {
        this.landingData = res.data?.[0]; // Save first entry
        console.log('Landing page loaded:', this.landingData);
      },
      error: (err) => {
        console.warn('Failed to load data from Strapi', err);
      }
    });
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
