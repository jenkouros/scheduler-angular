import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { SubCalendar } from '../../../models/calendar.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subcalendar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subcalendar-item.component.html',
  styleUrls: ['./subcalendar-item.component.css']
})
export class SubCalendarItemComponent implements OnInit {
  @Input() subCalendars: SubCalendar[];
  @Output() create = new EventEmitter<string>();
  @Output() remove = new EventEmitter<SubCalendar>();

  iconDelete = faTrash;
  constructor() {}

  ngOnInit() {}

  addSubCalendar(event: any) {
    this.create.emit(event.target.value);
  }

  removeSubCalendar(subCalendar: SubCalendar) {
    console.log(`remove->${subCalendar}`);
    this.remove.emit(subCalendar);
  }
}
