import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TimeTable } from '../../../models/timetable.model';
import { SubCalendar } from '../../../models/calendar.model';

@Component({
  selector: 'app-schedule-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-events.component.html',
  styleUrls: ['./schedule-events.component.css']
})
export class ScheduleEventsComponent implements OnInit {
  @Input() timeTables: TimeTable[];
  @Input() subCalendar: SubCalendar;

  @Output() add = new EventEmitter<boolean>();
  @Output() select = new EventEmitter<number>();
  @Output() create = new EventEmitter<TimeTable>();
  @Output() update = new EventEmitter<TimeTable>();
  @Output() remove = new EventEmitter<TimeTable>();

  ngOnInit() {}

  onSelect(item: TimeTable) {
    if (item) {
      this.select.emit(item.id);
    }
  }
  newTimeTable() {
    this.add.emit(true);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        template: 'header'
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'add',
          text: 'Dodaj dogodek',
          onClick: this.newTimeTable.bind(this)
        }
      }
    );
  }

  onCreate(timetable: TimeTable) {
    this.create.emit(timetable);
  }

  onUpdate(timetable: TimeTable) {
    this.update.emit(timetable);
  }

  onRemove(timetable: TimeTable) {
    // TODO: vskladiti s podobo
    const remove = window.confirm('Res želite brisati');
    if (remove) {
      this.remove.emit(timetable);
    }
  }
}
