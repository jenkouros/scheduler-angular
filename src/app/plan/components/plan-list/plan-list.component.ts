import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../../models';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanListComponent implements OnChanges {
  @Input()
  planItems: Plan[];

  @Output()
  selected = new EventEmitter<number>();

  @Output()
  remove = new EventEmitter<Plan>();

  editIcon = faPlus;
  deleteIcon = faTrash;
  selectedId: number;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.planItems && this.planItems.length > 0) {
      this.selectedId = 1;
      this.selected.emit(this.selectedId);
    }
  }

  onChange(e) {
    // this.selectedId = e.value;
    this.selectedId = e.idPlan;
    console.log(e);
    this.selected.emit(this.selectedId);
  }

  onAdd() {}

  onRemove(item: Plan) {
    this.remove.emit(item);
  }
}
