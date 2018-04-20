import { PlanItemHierarchy } from './planitem.model';
import { FilterSelectValue } from './filter.model';

export class PlanItemHierarchyDto {
    constructor(
        public planItemHierarchy: PlanItemHierarchy,
        public alternativeOptions: FilterSelectValue[]) {}
}

