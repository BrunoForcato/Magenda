import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveRouteService {
  private activeRouteSubject = new BehaviorSubject<string>('Dashboard');
  activeRoute$ = this.activeRouteSubject.asObservable();

  constructor() { }

  setActiveRoute(routeName: string) {
    this.activeRouteSubject.next(routeName);
  }

  getActiveRoute() {
    return this.activeRouteSubject
  }
}