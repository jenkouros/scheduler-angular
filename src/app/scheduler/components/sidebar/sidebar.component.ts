import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt, faClipboardList, faFilter, faLayerGroup, faSearch } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { appSettings } from '../../../../environments/environment';
import { AppComponentBase } from '../../../shared/app-component-base';
import * as fromStore from '../../store';


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
    const path = this.router.url.split('/');
    this.selected = path.length > 0 ? path[path.length - 1] : '';
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

        if (f !== undefined) {
          localStorage.setItem('selectedFilters', JSON.stringify(f)); // slows down process?
        }
      });

    this.containerFilterSubscription = this.store.pipe(select(fromStore.selectFilterContainers))
      .subscribe(f => {
        this.containerFilterActive = f !== null && f.length > 0;
      });

    const localFilters = localStorage.getItem('selectedFilters');
    if (localFilters) {
      const dict: {[id: number]: number[]} = {};
      const filters = JSON.parse(localFilters);

      Object.keys(filters)
        .forEach(function(id) {
          dict[id] = filters[id];
        });

      this.store.dispatch(new fromStore.ChangeFilter(dict));
    }
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
    this.store.dispatch(new fromStore.LoadPlanContainerGrid(undefined));
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
