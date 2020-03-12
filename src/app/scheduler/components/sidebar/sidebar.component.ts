import { Component, OnInit, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboardList, faFilter, faCalendarAlt, faSearch, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { appSettings } from '../../../../environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { Subscription } from 'rxjs';
import { formatMessage } from 'devextreme/localization';
import { AppComponentBase } from '../../../shared/app-component-base';


@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends AppComponentBase implements OnInit, OnDestroy {
  settings = appSettings;
  selected = '';
  filterSubscription: Subscription;
  containerFilterSubscription: Subscription;
  filterActive = false;
  containerFilterActive = false;

  constructor(private router: Router, private store: Store<fromStore.SchedulerState>) {
    super();
   }

  faItems = faClipboardList;
  faPlanItems = faCalendarAlt;
  faSearch = faSearch;
  faFilter = faFilter;
  faGroup = faLayerGroup;

  ngOnInit() {
    this.filterSubscription = this.store.pipe(select(fromStore.getSelectedFilters))
      .subscribe(f => {
        this.filterActive = f !== undefined && Object.keys(f).length > 0;
      });

    this.containerFilterSubscription = this.store.pipe(select(fromStore.selectFilterContainers))
      .subscribe(f => {
        this.containerFilterActive = f !== null && f.length > 0;
      });
  }

  getScrollHeight(elementRef: ElementRef) {
    return window.innerHeight - elementRef.nativeElement.getBoundingClientRect().top;
  }

  onFilterClear() {
    this.store.dispatch(new fromStore.ChangeFilter({}));
    this.store.dispatch(new fromStore.ChangeContainersFilter([]));
    this.store.dispatch(new fromStore.LoadItems());
    this.store.dispatch(new fromStore.LoadContainers());
    this.store.dispatch(new fromStore.LoadPreplanItems());
    this.store.dispatch(new fromStore.GetSearchItemsStore(''));
    this.store.dispatch(new fromStore.GetSearchPlanItemsStore(''));
    this.store.dispatch(new fromStore.LoadPlanItemGrid());
    this.store.dispatch(new fromStore.LoadPlanContainerGrid());
  }

  ngOnDestroy() {
    if (this.containerFilterSubscription) {
      this.containerFilterSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

}
