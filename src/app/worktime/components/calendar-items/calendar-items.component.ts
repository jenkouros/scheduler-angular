import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Calendar } from '../../models/calendar.model';

@Component({
  selector: 'app-calendar-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-items.component.html',
  styleUrls: ['./calendar-items.component.css']
})
export class CalendarItemsComponent implements OnInit {
  @Input() dataSource: Calendar[];
  @Output() editItem = new EventEmitter<number>();
  @Output() selectItem = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  onSelectItem(item: Calendar) {
    if (item) {
      this.selectItem.emit(item.id);
    }
  }

  onEditItem(item: Calendar) {
    if (item) {
      this.editItem.emit(item.id);
    }
  }
}
