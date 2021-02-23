import { Component, Input, OnInit } from '@angular/core';
import { AuditChangeEnum } from '../model/audit-change-type.model';
import { AuditModel } from '../model/audit.model';

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styles: []
})
export class AuditTableComponent implements OnInit {
  @Input() set auditModel(model: AuditModel) {
    this.setSource(model);
  }
  source: {
    planItemName: string | undefined,
    planItemId: number,
    changeType: string,
    changeTime: string,
    timeStart: string,
    timeEnd: string,
    relatedItemCode: string;
    itemCode: string;
  }[] = [];
  constructor() { }

  ngOnInit() {

  }

  setSource(model: AuditModel) {
    if(model != null){
      for (const group of model.auditGroups) {
        const relavantNodes = group.nodes.filter(i => i.data.idItem === model.itemId);
        for (const node of relavantNodes) {
          let relatedItemCode = '';
          const relatedEdgeIdx = group.edges.findIndex(i => i.target === node.id);
          if (relatedEdgeIdx > -1) {
            const relatedIdx = group.nodes.findIndex(i => i.id === group.edges[relatedEdgeIdx].source);
            relatedItemCode = group.nodes[relatedIdx].data.codeItem;
          }
          console.log("_------------- data: -------");
          console.warn(node);
          this.source.push({
            itemCode: node.data.codeItem,
            changeTime: group.createTime,
            planItemName: node.label,
            planItemId: node.data.planItemId,
            changeType: AuditChangeEnum[node.data.tags[0].type],
            timeStart: node.data.tags[0].timeStart,
            timeEnd: node.data.tags[0].timeEnd,
            relatedItemCode: relatedItemCode
          });
        }
      }
    }
    
  }

}
