import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-default-layout-pages',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, NgClass, NgIf, NavbarComponent],
  templateUrl: './default-layout-pages.component.html',
})
export class DefaultLayoutPagesComponent implements OnInit{
  @Input() title: string = '';
  @Input() showBtn: boolean = false;
  @Input() btnNewLink: string = '';

  isSidebarOpen: boolean = false

  ngOnInit(){
    if(window.innerWidth >= 760){
      this.getIsSidebarOpen()
    }
  }

  toggleSidebar(){
    sessionStorage.setItem('isSidebarOpen', JSON.stringify(!this.isSidebarOpen))
    this.getIsSidebarOpen()
  }

  getIsSidebarOpen(){
    const isSidebarOpen = sessionStorage.getItem('isSidebarOpen')
    this.isSidebarOpen = isSidebarOpen ? JSON.parse(isSidebarOpen) : false
  }

  closeSidebarOnClickLink(){
    if(window.innerWidth < 760){
      this.isSidebarOpen = false
    }
  }
}
