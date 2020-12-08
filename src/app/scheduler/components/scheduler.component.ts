import { Component, OnInit } from '@angular/core';
import { ContainerFacade } from '../store/facade';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent implements OnInit {
  constructor(private containerFacade: ContainerFacade) { }

  ngOnInit() {
    this.containerFacade.loadContainerStatuses();
  }

}
