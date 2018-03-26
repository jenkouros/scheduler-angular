import * as fromFeature from "../reducers";
import { createSelector } from "@ngrx/store";
import { Filter, FilterSelect } from "../../models/filter.model";

export const getFiltersState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.filters
);

export const getSelectedFilters = createSelector(
    getFiltersState,
    (state: fromFeature.FilterState) => {
        if(!state) {
            return undefined;
        }
        return state.selectedEntities
    } 
);

export const getFiltersCodeList = createSelector(
    getFiltersState,
    (state: fromFeature.FilterState) => {
        if(!state) {
            return undefined;
        }
        return state.entities;
    }
);

export const getFilters = createSelector(
    getFiltersCodeList,
    getSelectedFilters,
    (filters: Filter[], selectedFilters: { [id:number]: number[] } = {}) => {
        if(!filters) {
            return undefined;
        }
        return filters.map(f => {
            var filterSelect = new FilterSelect(f);
            if(selectedFilters[filterSelect.id]) {
                filterSelect.selectValues(selectedFilters[filterSelect.id])
            }
            return filterSelect;
/*
            if(selectedFilters[f.id]) {
                f.values.map(v => {
                    if(selectedFilters[f.id].indexOf(v.id) > -1) {
                        return {
                            ...v,
                            selected: true
                        }
                    }
                    return v;
                });
            }
            return f;*/
        });

        /*
        for(let selected in selectedFilters) {
            let elem = filters.find(x => x.id === +selected);
            if(elem) {
                elem.values.forEach(val => {
                    if(selectedFilters[selected].indexOf(val.id) > -1) {
                        val.selected = true;
                    } else {
                        val.selected = false;
                    }
                })
            }
        }
        return state.entities;
        */
    }
)