import { PlanItemHierarchy, PlanItem } from './planitem.model';
import { FilterSelectValue } from './filter.model';

export class PlanItemHierarchyDto {
    constructor(
        public planItem: PlanItem,
        public planItemHierarchy: PlanItemHierarchy,
        public alternativeOptions: FilterSelectValue[]) {}
}

