import { Component, OnInit, Input } from '@angular/core';
import { PreplanItem } from '../../../models/preplanitem.dto';

@Component({
  selector: 'app-pre-planitem-item',
  templateUrl: './pre-planitem-item.component.html',
  styleUrls: ['./pre-planitem-item.component.css']
})
export class PrePlanitemItemComponent implements OnInit {
  @Input() preplanitem: PreplanItem;
  constructor() { }

  ngOnInit() {
  }

}
