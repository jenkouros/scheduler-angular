import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanContainerGrid } from './../../../models/plan-container-grid.model';

@Component({
  selector: 'app-event-tooltip',
  templateUrl: './event-tooltip.component.html',
  styleUrls: ['./event-tooltip.component.css']
})
export class EventTooltipComponent {
  @Input() planItem: PlanContainerGrid;
  @Input() editable = true;
  @Output() deletePlanTask = new EventEmitter();

  onDeletePlanTask(e) {
    console.log(e);
    this.deletePlanTask.emit();
    e.stopPropagation();
    return false;
  }
}
