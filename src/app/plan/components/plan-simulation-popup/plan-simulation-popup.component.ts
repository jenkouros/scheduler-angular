import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Simulation, SimulationChangeStatus, SimulationState } from '../../models/change.model';

@Component({
  selector: 'app-plan-simulation-popup',
  templateUrl: './plan-simulation-popup.component.html',
  styleUrls: ['./plan-simulation-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanSimulationPopupComponent implements OnInit {
  @Input()
  changes: Simulation[];
  @Input()
  visible: boolean;

  @Output()
  cancel = new EventEmitter<boolean>();

  header = 'Simulacija - pregled sprememb';

  constructor() {
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {}

  onCancel() {
    this.cancel.emit(false);
    console.log('asas', this.changes[0]);
  }

  getChangeDescription(item: Simulation) {
    switch (item.changeStatus) {
      case SimulationChangeStatus.Added: {
        return 'DODAN';
      }
      case SimulationChangeStatus.Removed: {
        return 'ODSTRANJEN';
      }
      case SimulationChangeStatus.Moved: {
        return 'PRERAZPORED';
      }
      default:
        return '';
    }
  }

  getChangeClass(item: Simulation) {
    switch (item.changeStatus) {
      case SimulationChangeStatus.Added: {
        return 'badge badge-success';
      }
      case SimulationChangeStatus.Removed: {
        return 'badge badge-danger';
      }
      case SimulationChangeStatus.Moved: {
        return 'badge badge-info';
      }
      default:
        return '';
    }
  }

  getContainerName(state: SimulationState): string {
    if (state === null) {
      return '';
    }
    return `${state.container} - ${state.containerName}`;
  }

  getCodeName(state: SimulationState): string {
    if (state === null) {
      return '';
    }
    return `${state.code} - ${state.codeName}`;
  }
}
