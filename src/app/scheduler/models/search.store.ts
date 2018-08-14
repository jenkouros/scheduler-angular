import { GridStoreConfiguration } from './shared.dto';

export interface SearchState {
    searchItemsStoreConfiguration: GridStoreConfiguration | null;
    searchPlanItemsStoreConfiguration: GridStoreConfiguration | null;
}
