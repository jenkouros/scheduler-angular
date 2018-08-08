import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { SubCalendar } from '../../../models/calendar.model';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subcalendar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subcalendar-item.component.html',
  styleUrls: ['./subcalendar-item.component.css']
})
export class SubCalendarItemComponent implements OnInit {
  @Input() subCalendars: SubCalendar[];
  @Output() create = new EventEmitter<string>();
  @Output() editing = new EventEmitter<SubCalendar>();
  @Output() remove = new EventEmitter<SubCalendar>();

  iconDelete = faTrash;
  iconEdit = faEdit;

  constructor() {}

  ngOnInit() {}

  addSubCalendar(event: any) {
    this.create.emit(event.target.value);
  }

  editSubCalendar(subCalendar: SubCalendar) {
    this.editing.emit(subCalendar);
  }

  removeSubCalendar(subCalendar: SubCalendar) {
    console.log(`remove->${subCalendar}`);
    this.remove.emit(subCalendar);
  }
}
