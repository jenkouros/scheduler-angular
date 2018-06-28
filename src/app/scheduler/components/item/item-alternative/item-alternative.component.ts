import { Component, OnInit, Input } from '@angular/core';
import { ItemHierarchyAlternative } from '../../../models/item.dto';

@Component({
  selector: 'app-alternative',
  templateUrl: './item-alternative.component.html',
  styleUrls: ['./item-alternative.component.css']
})
export class ItemAlternativeComponent implements OnInit {
  @Input() alternative: ItemHierarchyAlternative;
  @Input() quantity = 0;
  constructor() { }

  ngOnInit() {
  }

}
