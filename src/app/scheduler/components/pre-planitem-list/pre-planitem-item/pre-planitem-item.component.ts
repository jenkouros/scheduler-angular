import { Component, OnInit, Input } from '@angular/core';
import { PreplanItem } from '../../../models/preplanitem.dto';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { faAlignJustify, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
@Component({
  selector: 'app-pre-planitem-item',
  templateUrl: './pre-planitem-item.component.html',
  styleUrls: ['./pre-planitem-item.component.css']
})
export class PrePlanitemItemComponent implements OnInit, AfterViewInit {
  @Input() preplanitem: PreplanItem;
  faAlignJustify = faCalendarAlt;
  constructor(private store: Store<fromStore.ContainerState>) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  reselectContainers() {
    this.store.dispatch(new fromStore.ReselectContainers(this.preplanitem.containers.map(i => i.container.id)));
  }

}
