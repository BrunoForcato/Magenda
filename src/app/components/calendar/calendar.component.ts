import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import interactionPlugin from '@fullcalendar/interaction'
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleModel } from '../../models/scheduleModel';
import { Observable, Subscription, map } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { response } from 'express';
import { ActiveRouteService } from '../../services/active-routes.service';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, NgxMaskDirective, ReactiveFormsModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  public showModal: boolean = false;
  public submitButtonText: string = 'Salvar Agendamento';

  scheduleForm!: FormGroup;
  scheduleModel: ScheduleModel = new ScheduleModel;
  events$!: Observable<ScheduleModel[]>;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.createScheduleForm()
    this.getAllEvents()
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay' // user can switch between the two
    },
    displayEventTime: false,
    locale: ptLocale,
    height: 750,
    initialView: 'dayGridMonth',
    eventColor: '#F4C584',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []

  };

  handleDateClick(event: any) {
    this.showModal = true;
    const formatedDate = this.datePipe.transform(event.date, 'dd/MM/yyyy HH:mm') || '';
    this.scheduleModel.scheduleDate = formatedDate
    this.scheduleForm.value.date = formatedDate;
    this.submitButtonText = 'Salvar Agendamento'
  }

  handleEventClick(info: any) {
    this.showModal = true;
    const formatedDate = this.datePipe.transform(info.event.start, 'dd/MM/yyyy HH:mm') || '';
    this.scheduleModel.scheduleDate = formatedDate
    this.scheduleModel.title = info.event.title
    this.scheduleModel.observation = info.event.extendedProps.observation
    this.scheduleModel.id = info.event.id
    this.submitButtonText = 'Atualizar Agendamento'
  }

  closeModal() {
    this.showModal = false;
    this.scheduleModel = new ScheduleModel;
  }

  createScheduleForm() {
    this.scheduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      observation: ['']
    })
  }

  async onSubmit() {
    var scheduleFormValue = this.scheduleModel as ScheduleModel;
    scheduleFormValue.scheduleDate = this.datePipe.transform(scheduleFormValue.scheduleDate, "yyyy-dd-MM") || '';

    if (this.submitButtonText == 'Atualizar Agendamento') {
      await this.scheduleService.UpdateSchedule(scheduleFormValue);
    } else {
      await this.scheduleService.AddNewSchedule(scheduleFormValue);
    }

    this.getAllEvents();
    this.closeModal()
  }

  async getAllEvents(): Promise<any> {
    this.events$ = await this.scheduleService.GetAllSchedules()
    this.events$.subscribe(results => {
      const newEvents: EventInput[] = []
      results.map(result => {
        let event: EventInput = { id: result.id?.toString(), title: result.title, date: result.scheduleDate, observation: result.observation }
        newEvents.push(event)
      })
      this.calendarOptions.events = newEvents
    })
  }
}
