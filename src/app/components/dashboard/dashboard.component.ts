import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserModel } from '../../models/userModel';
import { CanvasJSChart } from '../../canvasjs.angular.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CanvasJSChart],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public username: String = '';
  public schedulesTotal: number = 25;


  chartOptions = {
    animationEnabled: true,
    title: {
      text: this.schedulesTotal,
      verticalAlign: "center",
      dockInsidePlotArea: true,
      fontSize: 96,
      fontWeight: "lighter",
      fontColor: "#1B263B",
    },
    data: [{
      type: "doughnut",
      color: "#415A77",
      yValueFormatString: "#,###.##'%'",
      radius: "100%",
      innerRadius: "60%",
      dataPoints: [
        { y: 28, name: "Labour" },
      ]
    }]
  }

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  async getUserName() {
    const user: UserModel = await this.localStorageService.getItem("user").then(userString => (JSON.parse(userString || '{}')))
    this.username = user.name
  }
}
