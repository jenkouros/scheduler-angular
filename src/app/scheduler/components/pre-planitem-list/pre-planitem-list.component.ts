import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreplanitemState } from '../../store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';
import { PreplanItem } from '../../models/preplanitem.dto';

@Component({
  selector: 'app-pre-planitem-list',
  templateUrl: './pre-planitem-list.component.html',
  styleUrls: ['./pre-planitem-list.component.css']
})
export class PrePlanitemListComponent implements OnInit {
  preplanitems$: Observable<PreplanItem[]>;
  constructor(private store: Store<PreplanitemState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPreplanItems());
    this.preplanitems$ = this.store.select(fromStore.getPreplanitems);
  }

}
