import { Component,HostListener, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Footer } from '../../layout/footer/footer';
import { LeftSidebar } from '../../layout/left-sidebar/left-sidebar';
import { Hourglass } from "./components/hourglass/hourglass";
import { ProgressBar } from "./components/progress-bar/progress-bar";
import { Timer } from "./components/timer/timer";
import { Main } from "./main/main";


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
    Main
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
    isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  title = 'TimeTrack';
  isDarkTheme = localStorage.getItem('theme') === 'dark';
timer: any;

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
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}

