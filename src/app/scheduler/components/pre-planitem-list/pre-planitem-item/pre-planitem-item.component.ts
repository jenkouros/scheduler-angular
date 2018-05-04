import { Component, OnInit, Input } from '@angular/core';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-pre-planitem-item',
  templateUrl: './pre-planitem-item.component.html',
  styleUrls: ['./pre-planitem-item.component.css']
})
export class PrePlanitemItemComponent implements OnInit, AfterViewInit {
  @Input() preplanitem: PreplanItem;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}
