import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-planitem-index',
  template: `
    <app-planitem-list></app-planitem-list>
    <app-planitem-popup></app-planitem-popup>
  `
})
export class PlanItemIndexComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
