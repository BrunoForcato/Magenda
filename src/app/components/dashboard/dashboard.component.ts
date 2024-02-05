import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserModel } from '../../models/userModel';
import { CanvasJSChart } from '../../canvasjs.angular.component';
import { ScheduleService } from '../../services/schedule.service';
import { BehaviorSubject, Observable, async, count, map } from 'rxjs';
import { ScheduleModel } from '../../models/scheduleModel';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CanvasJSChart, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public username: String = '';
  public schedulesTotal$: Observable<number> = new Observable<number>;
  public schedules$: Observable<ScheduleModel[]> = new Observable<ScheduleModel[]>;


  chartOptions = {
    animationEnabled: true,
    title: {
      text: '0',
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

  constructor(private localStorageService: LocalStorageService, private scheduleService: ScheduleService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.getAllSchedules()
    this.getUserEmail();
  }

  async getUserEmail() {
    const user: UserModel = await this.localStorageService.getItem("user").then(userString => (JSON.parse(userString || '{}')))
    this.username = user.email
  }

  async getAllSchedules() {
    try {
      this.schedules$ = (await this.scheduleService.GetAllSchedules())
      this.schedulesTotal$ = await this.scheduleService.GetTotalSchedules()

      this.schedulesTotal$.subscribe(total => {

        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: total.toString(), // Usando o número total de itens
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
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  dateFormatter(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

}
