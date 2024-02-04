import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public username: String = '';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  async getUserName() {
    const user: UserModel = await this.localStorageService.getItem("user").then(userString => (JSON.parse(userString || '{}')))
    this.username = user.name
  }
}
