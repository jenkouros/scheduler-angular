import { Component, OnInit, Input } from '@angular/core';
import { SubItem } from '../../../models/item.dto';


@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css']
})
export class SubItemComponent implements OnInit {
  @Input() subItem: SubItem;
  constructor() { }

  ngOnInit() {
  }

}
