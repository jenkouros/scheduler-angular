import { Component, OnInit } from '@angular/core';
import { PlannerService } from './planner.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  providers: [PlannerService]
})
export class PlannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
