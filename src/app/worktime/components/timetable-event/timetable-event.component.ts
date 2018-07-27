import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeTable } from '../../models/timetable.model';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timetable-event',
  templateUrl: './timetable-event.component.html',
  styleUrls: ['./timetable-event.component.css']
})
export class TimetableEventComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;

  @Input() timeTableEvent: TimeTable;
  @Input() index: number;
  @Output() edit = new EventEmitter<TimeTable>();

  ngOnInit() {
    console.log('event', this.timeTableEvent);
  }

  onEdit() {
    this.edit.emit(this.timeTableEvent);
  }
}
