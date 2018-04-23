import { Component, OnInit, Input } from '@angular/core';
import { PlanSubItem } from '../../../../models/planitem.model';

@Component({
  selector: 'app-plansubitem',
  templateUrl: './plansubitem.component.html',
  styleUrls: ['./plansubitem.component.css']
})
export class PlansubitemComponent implements OnInit {
  @Input() subItem: PlanSubItem;
  constructor() { }

  ngOnInit() {
  }

}
