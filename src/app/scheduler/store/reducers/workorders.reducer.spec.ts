import * as fromActions from '../actions/workorders.action';
import * as fromWorkorders from './workorders.reducer';

describe('WorkordersReducer', () => {
    describe('Undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromWorkorders;
            const action = {};
            const state = fromWorkorders.workordersReducer(undefined, <any>action);
            expect(state).toBe(initialState);
        });
    });
    describe('LOAD_WORKORDERS action', () => {
        it('should set loading to true', () => {
            const { initialState } = fromWorkorders;
            const action = new fromActions.LoadWorkorders();
            const state = fromWorkorders.workordersReducer(initialState, action);
            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(true);
            expect(state.entities).toEqual({});            
        });
    });

    describe('LOAD_WORKORDERS_FAIL action', () => {
        it('should set loaded to false', () => {
            const { initialState } = fromWorkorders;
            const previousState = {...initialState, loading: true};
            const action = new fromActions.LoadWorkordersFail(<any>{});
            const state = fromWorkorders.workordersReducer(previousState, action);
            expect(state).toEqual(initialState);            
        });
    });

    describe('LOAD_WORKORDERS_SUCCESS action', () => {
        it('should set loaded to true', () => {
            const { initialState } = fromWorkorders;
            const previousState = {...initialState, loading: true};
            const action = new fromActions.LoadWorkordersFail(<any>{});
            const state = fromWorkorders.workordersReducer(previousState, action);
            expect(state).toEqual(initialState);            
        });
    });
});