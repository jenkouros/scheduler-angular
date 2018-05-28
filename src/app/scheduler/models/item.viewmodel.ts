import { Item, ItemHierarchy } from './item.dto';
import { FilterValue } from './filter.dto';

export class ItemHierarchyViewModel {
    constructor(
        public item: Item,
        public itemHierarchy: ItemHierarchy,
        public alternativeOptions: FilterValue[]) {}
}
