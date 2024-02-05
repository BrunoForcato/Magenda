import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActiveRouteService } from '../../services/active-routes.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private activeRouteService: ActiveRouteService) { }

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

    this.activeRouteService.setActiveRoute(routeName);
  }
}
