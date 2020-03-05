import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { ContainerSelect } from '../../../models/container.viewModel';

@Component({
  selector: 'app-container-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './container-item.component.html',
  styleUrls: ['./container-item.component.css']
})
export class ContainerItemComponent implements OnInit {
  @Input() container: ContainerSelect;
  @Output() selectContainer = new EventEmitter<number>();
  @Output() deselectContainer = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  toggleContainer() {
    this.container.selected
      ? this.onDeselectContainer()
      : this.onSelectContainer();
  }

  onSelectContainer() {
    this.selectContainer.emit(this.container.id);
  }

  onDeselectContainer() {
    this.deselectContainer.emit(this.container.id);
  }

}
