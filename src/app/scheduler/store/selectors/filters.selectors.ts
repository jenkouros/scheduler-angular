import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';
import { Filter } from '../../models/filter.dto';
import { FilterServer } from '../../models/server/filter.servermodel';
import { FilterSelect } from '../../models/filter.viewmodel';

export const getFiltersState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.filters
);

export const getSelectedFilters = createSelector(
    getFiltersState,
    (state: fromFeature.FilterState) => {
        if (!state) {
            return undefined;
        }
        return state.selectedEntities;
    }
);

export const getFilterCodeList = createSelector(
    getFiltersState,
    (state: fromFeature.FilterState) => {
        if (!state) {
            return undefined;
        }
        return state.entities;
    }
);

export const getFilterSelectList = createSelector(
    getFilterCodeList,
    getSelectedFilters,
    (filters: Filter[], selectedFilters: { [id: number]: number[] } = {}) => {
        if (!filters) {
            return undefined;
        }
        return filters.map(f => {
            const filterSelect = new FilterSelect(f);
            if (selectedFilters[filterSelect.id]) {
                filterSelect.selectValues(selectedFilters[filterSelect.id]);
            }
            return filterSelect;
        });
    }
);
