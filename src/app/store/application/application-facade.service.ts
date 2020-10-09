import { Store, select } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as ApplicationSelectors from './application.selectors';
import { Injectable } from '@angular/core';
import * as ApplicationActions from './application.actions';

@Injectable()
export class ApplicationFacadeService {
  public loader$ = this.store.pipe(select(ApplicationSelectors.selectLoader));
  counter = 0;
  constructor(private store: Store<AppState>) {}

  setLoader(mode: boolean) {
    const preventDispatch = this.counter > 0 && mode || this.counter === 0 && !mode;



    this.counter = this.counter + (mode ? 1 : -1);
    this.counter = Math.max(0, this.counter);

    if (!preventDispatch) {
      this.store.dispatch(this.counter !== 0
        ? new ApplicationActions.LoaderShow()
        : new ApplicationActions.LoaderHide());
    }
  }
}
