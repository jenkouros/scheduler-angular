import { PlanItemGrid } from './../../../../models/plan-item-grid-model';
import { getContainerSelectList } from './../../../../store/selectors/containers.selectors';
import { Store, select } from '@ngrx/store';
import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanGridGroup } from './../../../../models/plan-grid-group.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../store/app.reducers';
import * as PlanItemGridSelectors from '../../../../store/selectors/plan-item-grid.selectors';
import * as PlanItemGridActions from '../../../../store/actions/plan-item-grid.action';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-plan-group',
  templateUrl: './plan-group.component.html'
})
export class PlanGroupComponent {
  model: PlanGridGroup[] = [
    {
      groupCode: '438757',
      groupName: 'Article',

    } as PlanGridGroup
  ];
  groupDataSourceStorage: any = [];
  containers$: Observable<ContainerSelect[]>;
  planItemGrid$: Observable<PlanItemGrid[]>;
  planItemGrid: PlanItemGrid[] = [];


  constructor(private store: Store<AppState>) {
    this.containers$ = store.pipe(select(getContainerSelectList));
    this.planItemGrid$ = store.pipe(select(PlanItemGridSelectors.getPlanItemGrid));
    store.pipe(select(PlanItemGridSelectors.limitItemLoadDate)).
      subscribe(i => store.dispatch(new PlanItemGridActions.LoadPlanItemGrid()));
    this.planItemGrid$.subscribe(g => this.planItemGrid = g.map(o => {
      o.groupKey = o.item.articleCode;
      return o;
    }));
  }


  getItems(key) {
    const code = key.toString();
    let item = this.groupDataSourceStorage.find(i => i.key === key);
    if (!item) {
      item = {
        key: key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.planItemGrid,
            key: 'item.idItem',
          }),

        }),
        // filter: ['groupKey', '=', key],
        // group: 'item.articleCode'
      };
      this.groupDataSourceStorage.push(item);
    }
    return item.dataSourceInstance;
  }

}
