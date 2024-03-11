import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/userModel';
import { ScheduleModel } from '../models/scheduleModel';
import { LocalStorageService } from './local-storage.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly baseURL = environment["endPoint"];

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  async GetToken(): Promise<string> {
    const token = await this.localStorageService.getItem('token');
    return token || ''
  }

  async GetAllSchedules() {
    const token = await this.GetToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get<any>(`${this.baseURL}/GetAllSchedules/`, { headers: headers })
  }

  async GetTotalSchedules() {
    const token = await this.GetToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get<any>(`${this.baseURL}/GetSchedulesCount/`, { headers: headers })
  }

  async AddNewSchedule(scheduleModel: ScheduleModel) {
    try {
      const token = await this.GetToken()
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })

      var newSchedule: any = {
        title: scheduleModel.title,
        date: scheduleModel.scheduleDate.toString(),
        observation: scheduleModel.observation
      }

      const response = this.httpClient.post<any>(`${this.baseURL}/CreateSchedule/`, newSchedule, { headers: headers }).subscribe();
      return response
    } catch (e) {
      return false
    }
  }

  async UpdateSchedule(scheduleModel: ScheduleModel) {
    try {
      const token = await this.GetToken()
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })

      var newSchedule: any = {
        id: scheduleModel.id,
        title: scheduleModel.title,
        date: scheduleModel.scheduleDate.toString(),
        observation: scheduleModel.observation
      }

      const response = this.httpClient.post<any>(`${this.baseURL}/UpdateSchedule/`, newSchedule, { headers: headers }).subscribe();
      return response
    } catch (e) {
      return false
    }
  }
}
