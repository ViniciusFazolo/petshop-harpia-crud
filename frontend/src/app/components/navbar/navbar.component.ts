import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() isSidebarOpen = new EventEmitter()

  constructor(private route: Router){}

  openSidebar(){
    this.isSidebarOpen.emit()
  }
}
