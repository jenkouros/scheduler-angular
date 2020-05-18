import { PlannedEvent } from './../../../../models/event.model';
import { Component, Input } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/app-component-base';


@Component({
  templateUrl: './event-tooltip-operation.component.html',
  selector: 'app-event-tooltip-operation'
})
export class EventTooltipOperationComponent extends AppComponentBase {
  @Input() planItem: PlannedEvent;
}
