import { Component, OnInit } from '@angular/core';
import '@progress/kendo-ui';
import { PlannerService } from '../planner.service';

@Component({
  selector: 'app-plan-viewer',
  templateUrl: './plan-viewer.component.html',
  styleUrls: ['./plan-viewer.component.css']
})
export class PlanViewerComponent implements OnInit {

  constructor(private plannerService: PlannerService) { }

  ngOnInit() {
    console.log(kendo);
    $("#cal").kendoScheduler({
      date: new Date(), // The current date
      dataSource: PlannerService.getDataSource(),
      views: PlannerService.getViewsObject()
    });
  }

}
