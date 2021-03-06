import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Plan } from '../../models';
import { faPlus, faTrash, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { DxSelectBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanListComponent implements OnChanges {
  @Input()
  planItems: Plan[];
  @Input() selectedId = 1;

  @Output()
  selected = new EventEmitter<number>();
  @Output()
  add = new EventEmitter<boolean>();
  @Output()
  remove = new EventEmitter<Plan>();
  @Output()
  showSimulation = new EventEmitter<number>();

  @ViewChild(DxSelectBoxComponent, { static:false }) selectBox: DxSelectBoxComponent;

  editIcon = faPlus;
  deleteIcon = faTrash;
  simulationIcon = faChartBar;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.planItems && this.planItems.length > 0) {
      this.selectedId = 1;
      this.selected.emit(this.selectedId);
    }
  }

  onChange(e) {
    this.selectedId = e.idPlan;
    console.log(e);
    this.selected.emit(this.selectedId);
  }

  onAdd() {
    this.add.emit(true);
  }

  onRemove(e: any, item: Plan) {
    e.event.preventDefault();
    e.event.stopPropagation();
    this.selectBox.instance.close();
    this.remove.emit(item);
  }

  onShowSimulation() {
    this.showSimulation.emit(this.selectedId);
  }
}
