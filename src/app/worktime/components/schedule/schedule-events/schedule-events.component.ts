import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TimeTable } from '../../../models/timetable.model';

@Component({
  selector: 'app-schedule-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-events.component.html',
  styleUrls: ['./schedule-events.component.css']
})
export class ScheduleEventsComponent implements OnInit {
  @Input() timeTables: TimeTable[];
  @Output() add = new EventEmitter<boolean>();
  @Output() select = new EventEmitter<number>();

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
}
