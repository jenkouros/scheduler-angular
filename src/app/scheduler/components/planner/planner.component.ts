import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Container } from '../../models/container.dto';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
