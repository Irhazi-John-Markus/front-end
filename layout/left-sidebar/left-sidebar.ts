import { CommonModule } from '@angular/common';
import { Component, input, output, TrackByFunction } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css'
})
export class LeftSidebar {
    isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  
  items: SidebarItem[] = [
    {
      routeLink: 'login', 
      icon: 'account_circle',
      label: 'Login ',
    },
    {
      routeLink: 'dashboard',
      icon: 'house',
      label: 'Home',
    },
    {
      routeLink: 'leave-tickets',
      icon: 'event_note',
      label: 'Leave Tickets',
    },
    {
      routeLink: 'vacation',
      icon: 'beach_access',
      label: 'Vacation',
    },
    {
      routeLink: 'Summary',
      icon: 'cloud',
      label: 'Summary',
    },
    {
      routeLink: 'Search-filter',
      icon: 'search',
      label: 'Search-Filter',
    },
  ];
  trackByFn!: TrackByFunction<{ routeLink: string; icon: string; label: string; }>;

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
type SidebarItem = {
  routeLink: string;
  icon: string;
  label: string;
}
