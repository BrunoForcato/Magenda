import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  routes = [
    {
      title: "Dashboard",
      active: true
    },
    {
      title: "Agenda",
      active: false
    },
  ]

  toogleActiveRoute(routeName: string) {
    this.routes.map(route => {
      if (route.title === routeName) {
        route.active = true;
      } else {
        route.active = false;
      }
    })
  }
}
