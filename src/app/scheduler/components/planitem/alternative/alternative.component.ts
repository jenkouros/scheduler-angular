import { Component, OnInit, Input } from '@angular/core';
import { PlanItemHierarchyAlternative } from '../../../models/planitem.dto';

@Component({
  selector: 'app-alternative',
  templateUrl: './alternative.component.html',
  styleUrls: ['./alternative.component.css']
})
export class AlternativeComponent implements OnInit {
  @Input() alternative: PlanItemHierarchyAlternative;

  constructor() { }

  ngOnInit() {
  }

}
