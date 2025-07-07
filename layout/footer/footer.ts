import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-footer',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Input() screenWidth: number = 0;
  currentYear: number = new Date().getFullYear();
}
