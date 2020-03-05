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
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-schedule-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-events.component.html',
  styleUrls: ['./schedule-events.component.css']
})
export class ScheduleEventsComponent extends AppComponentBase implements OnInit {

  constructor() {
    super();
  }

  @Input()
  timeTables: TimeTable[];
  @Input()
  subCalendar: SubCalendar;

  @Output()
  add = new EventEmitter<boolean>();
  @Output()
  select = new EventEmitter<number>();
  @Output()
  create = new EventEmitter<TimeTable>();
  @Output()
  update = new EventEmitter<TimeTable>();
  @Output()
  remove = new EventEmitter<TimeTable>();

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
          text: this.translate('Add_Event'),
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
    this.remove.emit(timetable);
  }
}
