import * as fromActions from '../actions/planitems.action';
import * as fromPlanItems from './planitems.reducer';

describe('PlanItemsReducer', () => {
    describe('Undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromPlanItems;
            const action = {};
            const state = fromPlanItems.planItemsReducer(undefined, <any>action);
            expect(state).toBe(initialState);
        });
    });

    describe('LOAD_PLANITEMS action', () => {
        it('should set loading to true', () => {
            const { initialState } = fromPlanItems;
            const action = new fromActions.LoadPlanItems();
            const state = fromPlanItems.planItemsReducer(initialState, action);
            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(true);
            expect(state.entities).toEqual({});            
        });
    });

    describe('LOAD_PLANITEMS_FAIL action', () => {
        it('should set loaded to false', () => {
            const { initialState } = fromPlanItems;
            const previousState = {...initialState, loading: true};
            const action = new fromActions.LoadPlanItemsFail(<any>{});
            const state = fromPlanItems.planItemsReducer(previousState, action);
            expect(state).toEqual(initialState);            
        });
    });

    describe('LOAD_PLANITEMS_SUCCESS action', () => {
        it('should set loaded to true', () => {
            const { initialState } = fromPlanItems;
            const previousState = {...initialState, loading: true};
            const action = new fromActions.LoadPlanItemsSuccess(<any>{});
            const state = fromPlanItems.planItemsReducer(previousState, action);
            expect(state.loaded).toEqual(true);      
            expect(state.loading).toEqual(false);        
        });
    });
});