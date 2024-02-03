import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private localStorageService: LocalStorageService, private router: Router) {

  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate([''])
  }
}
