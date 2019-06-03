import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Calendar, SubCalendar } from '../../../models/calendar.model';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-calendar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent extends AppComponentBase implements OnInit {
  @Input() calendar: Calendar;

  @Output() select = new EventEmitter<Calendar>();
  @Output() remove = new EventEmitter<Calendar>();
  @Output() createSchedule = new EventEmitter<SubCalendar>();

  editIcon = faEdit;
  deleteIcon = faTrash;
  constructor() {
    super();
  }

  ngOnInit() {}

  addSchedule() {}

  onRemove(calendar: Calendar) {
    this.remove.emit(calendar);
  }

  onSelect() {
    this.select.emit(this.calendar);
  }

  onCreateSchedule(name: string) {
    this.createSchedule.emit({
      id: 0,
      idCalendar: this.calendar.id,
      name
    });
  }
}
