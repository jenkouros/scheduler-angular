import { PipeTransform, Pipe } from '@angular/core';
import { PlanItemMoveStatusEnum } from '../../../models/event.model';

@Pipe({
    name: 'planItemStatusName'
})
export class PlanItemStatusPipe implements PipeTransform {
    transform(value: PlanItemMoveStatusEnum, ...args: any[]) {
        switch (value) {
            case PlanItemMoveStatusEnum.Added: return 'Dodan';
            case PlanItemMoveStatusEnum.Moved: return 'Spremenjen';
            case PlanItemMoveStatusEnum.Removed: return 'Odstranjen';
            case PlanItemMoveStatusEnum.Unchanged: return 'Nespremenjen';
            case PlanItemMoveStatusEnum.ExtendedForNotWorkingHours: return 'Razširjen';
        }
    }
}
