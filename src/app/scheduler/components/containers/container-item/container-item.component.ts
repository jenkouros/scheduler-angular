import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerSelect } from '../../../models/container.viewModel';
import { appSettings } from './../../../../../environments/environment';

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
  environment = appSettings;
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
