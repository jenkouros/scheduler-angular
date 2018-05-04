import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DxPopupComponent, DxDataGridComponent } from 'devextreme-angular';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/take';
import { NgForm } from '@angular/forms';

import { PlanItemState } from '../../store/reducers/planitems.reducer';
import { PlanItemHierarchyViewModel } from '../../models/planitem.viewmodel';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItem, PlanItemHierarchyAlternative } from '../../models/planitem.dto';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  alternatives: PlanItemHierarchyAlternative[];
  planItemsStore: CustomStore | null;
  selectedPlanItemHierarchy$: Observable<PlanItemHierarchyViewModel | null>;
  selectedAlternativeId: number | null = null;
  popupVisible = false;

  @ViewChild('f') signupForm: NgForm;
  batch = {
    quantity: '',
    numberOfBatches: '',
    alternative: <any>0
  };
  submitted = false;

  constructor(private store: Store<fromStore.SchedulerState>) {
    this.logClick = this.logClick.bind(this);
    this.hidePlanInfo = this.hidePlanInfo.bind(this);
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPlanItems());
    this.store.select(fromStore.getPlanItemsStore)
      .take(1)
      .subscribe(itemsStore => this.planItemsStore = itemsStore);

    this.selectedPlanItemHierarchy$ = this.store.select(fromStore.getSelectedPlanItemHierarchy);

    this.selectedPlanItemHierarchy$.subscribe(hierarchy => {
      this.alternatives = hierarchy
        ? hierarchy.planItemHierarchy.alternatives
        : [];
      this.selectedAlternativeId = this.alternatives.length > 0 ? this.alternatives[0].id : null;
    });
  }

  log(test) {
    console.log(test);
  }

  logClick() {
    console.log('Clicked button');
    this.hidePlanInfo();
  }

  hidePlanInfo() {
    this.popupVisible = false;
  }

  showPlanInfo(planItem: PlanItem) {
    this.store.dispatch(new fromStore.LoadPlanItemHierarchy({planItemId: planItem.idItem}));
    this.popupVisible = true;
  }

  selectAlternative(alternativeId: number) {
    this.selectedAlternativeId = alternativeId;
  }

  getSelectedAlternative() {
    return this.alternatives.find(i => i.id === this.selectedAlternativeId);
  }

  onSubmit() {
    this.submitted = true;
    this.batch.quantity = this.signupForm.value.batchData.quantity;
    this.batch.numberOfBatches = this.signupForm.value.batchData.numberOfBatches;
    this.batch.alternative = this.selectedAlternativeId;
    this.signupForm.reset();

    console.log(`{Količina}=> ${this.batch.quantity}`);
    console.log('{Število šarž}=>' + this.batch.quantity);
    console.log('{Alternativa}=>' + this.batch.alternative);
  }

}
