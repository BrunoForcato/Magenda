import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import interactionPlugin from '@fullcalendar/interaction'
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleModel } from '../../models/scheduleModel';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, NgxMaskDirective, ReactiveFormsModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  public showModal: boolean = false;
  scheduleForm!: FormGroup;
  scheduleModel: ScheduleModel = new ScheduleModel;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.createScheduleForm()
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay' // user can switch between the two
    },
    locale: ptLocale,
    height: 750,
    initialView: 'dayGridMonth',
    eventColor: '#F4C584',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [
      { title: 'event 1', date: '2024-02-01', observation: 'teste' },
      { title: 'event 1', date: '2024-02-02', observation: 'teste23' },
    ]

  };

  handleDateClick(event: any) {
    this.showModal = true;
    const formatedDate = this.datePipe.transform(event.date, 'dd/MM/yyyy HH:mm') || '';
    this.scheduleModel.date = formatedDate
    this.scheduleForm.value.date = formatedDate;
  }

  handleEventClick(info: any) {
    this.showModal = true;
    console.log(info.event)
    const formatedDate = this.datePipe.transform(info.event.start, 'dd/MM/yyyy HH:mm') || '';
    this.scheduleModel.date = formatedDate
    this.scheduleModel.title = info.event.title
    this.scheduleModel.observation = info.event.extendedProps.observation
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

  onSubmit() {
    var scheduleFormValue = this.scheduleModel as ScheduleModel;
    console.log(scheduleFormValue)
  }
}
