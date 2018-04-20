import { PlanItemHierarchy } from './planitem.model';

export class PlanItemHierarchyDto {
    constructor(
        public planItemHierarchy: PlanItemHierarchy,
        public alternativeOptions: string[]) {}
}

