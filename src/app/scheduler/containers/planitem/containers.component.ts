import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { ContainerSelect } from '../../models/container.viewModel';
import * as fromPlanStore from '../../../plan/store';

@Component({
  selector: 'app-containers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-container-item
      *ngFor="let container of (containers$ | async)"
      [container]="container"
      (selectContainer)="onSelectContainer($event)"
      (deselectContainer)="onDeselectContainer($event)"
    >
    </app-container-item>
    <app-container-group
      [containers]="containers$ | async"
      [selectedContainerIds]="selectedContainers$ | async"
      (groupSelect)="onSelectContainers($event)"
      (groupDeselect)="onDeselectContainers($event)"
    >
    </app-container-group>
  `
})
export class ContainersComponent implements OnInit {
  containers$: Observable<ContainerSelect[]>;
  selectedContainers$: Observable<number[]>;
  constructor(
    private store: Store<fromStore.SchedulerState>,
    private planStore: Store<fromPlanStore.SchedulerPlansState>
  ) {}

  ngOnInit() {
    this.planStore.select(fromPlanStore.getSelectedPlanId).subscribe(id => {
      this.store.dispatch(new fromStore.LoadContainers());
    });

    this.containers$ = this.store.pipe(select(fromStore.getContainerSelectList));
    this.selectedContainers$ = this.store.pipe(select(fromStore.getSelectedContainerIds));
  }

  onSelectContainer(containerId: number) {
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId: number) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }
  onSelectContainers(containerIds: number[]) {
    this.store.dispatch(new fromStore.SelectContainers(containerIds));
  }

  onDeselectContainers(containerIds: number[]) {
    this.store.dispatch(new fromStore.DeselectContainers(containerIds));
  }
}
