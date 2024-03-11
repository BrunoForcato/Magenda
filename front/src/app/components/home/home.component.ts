import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ActiveRouteService } from '../../services/active-routes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, DashboardComponent, CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user?: UserModel;
  routeActive!: string

  constructor(private localStorageService: LocalStorageService, private router: Router, private activeRouteService: ActiveRouteService) {
    this.activeRouteService.activeRoute$.subscribe(value => {
      this.routeActive = value;
    })
  }

  ngOnInit(): void {
    this.isAuthenticated()
  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate([''])
  }

  async isAuthenticated() {
    const userString = await this.localStorageService.getItem('user');
    if (userString === null) {
      this.router.navigate(['login']);
    }
  }

  async getUserData() {
    const userData = await this.localStorageService.getItem('user') || '{}';
    this.user = JSON.parse(userData);
  }


}
