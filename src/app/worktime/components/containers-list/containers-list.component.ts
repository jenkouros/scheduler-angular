import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterContentInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { TimeTable } from '../../models/timetable.model';
import { Container } from '../../../scheduler/models/container.dto';
import { DxDataGridComponent } from '../../../../../node_modules/devextreme-angular';

@Component({
  selector: 'app-containers-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './containers-list.component.html',
  styleUrls: ['./containers-list.component.css']
})
export class ContainersListComponent implements OnInit {
  @Input() containers: Container[];
  @Input() header: string;

  @Output() selected = new EventEmitter<number[]>();

  @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;
  constructor() {}

  ngOnInit() {}

  onContentReadyHandler(e) {
    e.component.deselectAll();
  }

  onSelected(item: any) {
    if (item.selectedRowKeys) {
      this.selected.emit(item.selectedRowKeys);
    }
  }
}
