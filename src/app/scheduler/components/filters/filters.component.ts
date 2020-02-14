import { Component, OnInit, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { FilterTypeEnum } from '../../models/filter.enum';
import { FilterSelect } from '../../models/filter.viewmodel';
import { Container } from '../../models/container.dto';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit, OnDestroy {
  FilterTypeEnum: typeof FilterTypeEnum = FilterTypeEnum;
  filtersState$: Observable<FilterSelect[] | undefined>;
  selectedContainers: string[] | null = null;
  containerSubscription: Subscription;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadFilters());
    this.filtersState$ = this.store.select(fromStore.getFilterSelectList);
    this.containerSubscription = this.store.select(fromStore.selectFilterContainers)
      .subscribe(data => {
        this.selectedContainers = data.map(c => c.displayExpression);
      });
    // this.store.select(fromStore.getFilters).subscribe((x) => {
    //   console.log(x);
    // });
  }

  onFilterChange(id: number, values: number[]) {
    this.store.dispatch(new fromStore.ChangeOneFilter({ id: id, values: values }));
    // if (!remove) {
    //   this.store.dispatch(new fromStore.SelectValueOnFilter({ id: id, value: value }));
    // } else {
    //   this.store.dispatch(new fromStore.RemoveValueOnFilter({ id: id, value: value }));
    // }
    this.store.dispatch(new fromStore.LoadItems());
    this.store.dispatch(new fromStore.LoadContainers());
    this.store.dispatch(new fromStore.LoadPreplanItems());
    this.store.dispatch(new fromStore.GetSearchItemsStore(''));
    this.store.dispatch(new fromStore.GetSearchPlanItemsStore(''));
    this.store.dispatch(new fromStore.LoadPlanItemGrid());
    this.store.dispatch(new fromStore.LoadPlanContainerGrid());

  }

  getScrollHeight(el: ElementRef) {
    return window.innerHeight - el.nativeElement.getBoundingClientRect().top;
    // const maxHeight = window.innerHeight * 0.7;
    // const elementHeight = el.nativeElement.offsetHeight;
    // return Math.min(maxHeight, elementHeight);
  }

  ngOnDestroy() {
    if (this.containerSubscription) {
      this.containerSubscription.unsubscribe();
    }
  }

}
