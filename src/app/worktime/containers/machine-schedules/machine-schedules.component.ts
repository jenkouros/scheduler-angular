import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../models/worktime.model';

@Component({
  selector: 'app-machine-schedules',
  templateUrl: './machine-schedules.component.html',
  styleUrls: ['./machine-schedules.component.css']
})
export class MachineSchedulesComponent implements OnInit {

  selectedId: number;
  items: any[];
  schedules: Schedule[] = [{
    id: 1,
    timeStart: new Date(),
    timeEnd: new Date()
  }, {
    id: 2,
    timeStart: new Date(),
    timeEnd: new Date()
  }];

  constructor() {

    this.items = [{
      location: 'before',
      locateInMenu: 'never',
      template: () => {
        return '<div class=\'toolbar-label\'>Urniki strojev</div>';
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',

      options: {
        icon: 'plus',
        onClick: () => {

        }
      }
    }];
  }

  ngOnInit() {
  }


  handleSelect(id: number) {
    this.selectedId = id;
  }
}
