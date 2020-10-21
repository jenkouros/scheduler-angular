import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuditChangeEnum } from '../model/audit-change-type.model';
import { AuditGroup } from '../model/audit.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() auditGroup: AuditGroup;
  @Input() initialItemId: number;
  @Output() nodeClicked = new EventEmitter<number>();
  changeType = AuditChangeEnum;

  constructor() { }

  ngOnInit() {
    console.log(this.auditGroup);
  }
  log(data: string) {
    console.log(data);
  }
  openNode(idItem: number) {
    this.nodeClicked.emit(idItem);
  }
}
