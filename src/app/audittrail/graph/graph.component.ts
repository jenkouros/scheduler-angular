import { Component, OnInit, Input } from '@angular/core';
import { AuditGroup } from '../model/audit.model';
import { AuditChangeEnum } from '../model/audit-change-type.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() auditGroup: AuditGroup;
  @Input() initialItemId: number;
  changeType = AuditChangeEnum;

  constructor() { }

  ngOnInit() {
    console.log(this.auditGroup);
  }
  log(data: string) {
    console.log(data);
  }
  openNode() {}
}
