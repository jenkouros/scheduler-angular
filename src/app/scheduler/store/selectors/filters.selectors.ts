import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';
import { Filter } from '../../models/filter.dto';
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

export const getRecreateOnToggle = createSelector(
    getFiltersState,
    (state: fromFeature.FilterState) => {
        return state.recreateOnToggle;
    }
);

export const getFilterSelectList = createSelector(
    getFilterCodeList,
    getSelectedFilters,
    getRecreateOnToggle,
    (filters: Filter[], selectedFilters: { [id: number]: number[] } = {}, recreateTag) => {
        if (!filters) {
            return undefined;
        }
        return filters.map(f => {
            f.recreateOnToggle = recreateTag;
            const filterSelect = FilterSelect.create(f);
            if (selectedFilters[filterSelect.id]) {
                filterSelect.selectValues(selectedFilters[filterSelect.id]);
            }
            return filterSelect;
        });
    }
);

export const selectFilterContainers = createSelector(
    getFiltersState,
    state => state.selectedContainers
);
