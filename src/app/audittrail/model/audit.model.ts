import { Node, Edge, NodeDimension } from '@swimlane/ngx-graph';

export interface AuditNodeServer {
  planItemId: number;
  itemId: number;
  itemCode: string;
  updateTime: string;
  id: number;
  label: string;
  tags: AuditTagServer[];
}

export interface AuditTagServer {
  type: number;
  data: string;
}

export interface AuditEdgeServer {
  source: number;
  target: number;
}

export interface AuditModelServer {
  itemId: number;
  auditGroups: AuditGroupServer[];
  // nodes: AuditNodeServer[];
  // edges: AuditEdgeServer[];
}

export interface AuditGroupServer {
  createTime: string;
  nodes: AuditNodeServer[];
  edges: AuditEdgeServer[];
}

export class AuditGroup {
  createTime: string;
  nodes: Node[];
  edges: Edge[];
}

export class AuditModel {
  itemId: number;
  auditGroups: AuditGroup[];
  // nodes: Node[];
  // edges: Edge[];

  static fromServer(data: AuditModelServer) {
    const result = new AuditModel();
    result.itemId = data.itemId;
    result.auditGroups = data.auditGroups.map(g => {
      const group = new AuditGroup();
      group.createTime = g.createTime;
      group.edges = g.edges.map(e => {
        return {
          source: e.source.toString(),
          target: e.target.toString()
        } as Edge;
      });
      group.nodes = g.nodes.map(n => {
        return {
          id: n.id.toString(),
          label: n.label,
          data: {
            idItem: n.itemId,
            codeItem: n.itemCode,
            idPlanItem: n.planItemId,
            tags: n.tags.map(m => ({
              type: m.type,
              data: m.data
            }))
          },
          dimension: {
            width: 350,
            height: 50
          } as NodeDimension
        } as Node;
      });
      return group;
    });
    return result;
  }
}
