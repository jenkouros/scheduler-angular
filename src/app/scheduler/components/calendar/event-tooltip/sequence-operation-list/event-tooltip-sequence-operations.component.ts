import { PlannedEventSimple } from './../../../../models/event.model';
import { Component, Input } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/app-component-base';

@Component({
  selector: 'app-event-tooltip-sequence',
  templateUrl: './event-tooltip-sequence-operations.component.html'
})
export class SequenceOperationListComponent extends AppComponentBase {
  @Input() sequence: PlannedEventSimple[] = [];
  @Input() selectedIdPrePlanitem: number;
}
