import { PlanItem, PlanItemHierarchy } from './planitem.dto';
import { FilterValue } from './filter.dto';

export class PlanItemHierarchyViewModel {
    constructor(
        public planItem: PlanItem,
        public planItemHierarchy: PlanItemHierarchy,
        public alternativeOptions: FilterValue[]) {}
}
