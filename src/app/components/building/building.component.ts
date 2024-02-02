import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss'
})
export class BuildingComponent {
  constructor(private router: Router) { }

  returnButton() {
    this.router.navigate([''])
  }
}
