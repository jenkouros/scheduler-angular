import { Filter } from "../../models/filter.model";
import * as formFilters from '../actions/filters.action';

export interface FilterState {
    entities: Filter[];
    selectedEntities: { [id: string]: number[] };
    loading: boolean;
    loaded: boolean;
}

export const initialState: FilterState = {
    entities: [],
    selectedEntities: {},
    loaded: false,
    loading: false
};

export function filtersReducer(
    state = initialState, 
    action: formFilters.filterActions) 
{
    switch(action.type) {
        case formFilters.LOAD_FILTERS: {
            return {
                ...state,
                loading: true
            };
        }
        case formFilters.LOAD_FILTERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case formFilters.LOAD_FILTERS_SUCCESS: {
            const filters = [...action.payload];
            return {
                ...state,
                loaded: true,
                loading: false,
                entities: filters
            };
        }
        case formFilters.CHANGE_FILTER: {
            let selected = {...state.selectedEntities};
            for(let key in action.payload) {
                selected[key] = [...action.payload[key]];
            }

            let entities = state.entities.map(entity => {
                let values = entity.values.map(value => {
                    return {
                        ...value,
                        selected: (selected[entity.id] && selected[entity.id].indexOf(value.id) > -1)
                    }
                });

                return {
                    ...entity,
                    values: values
                };
            })

            

            return {
                ...state,
                selectedEntities: selected,
                entities: entities
            };
        }
    }

}