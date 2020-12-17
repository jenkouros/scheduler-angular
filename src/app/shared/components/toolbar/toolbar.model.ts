export enum ToolbarItemStateEnum {
  visible,
  disabled,
  hidden
}

export enum ToolbarItemTypeEnum {
  button = 1,
  toggle,
  date,
  text
}

export enum ToolbarItemActionEnum {
  ExecuteProcess = 1,
  ResumeProcess = 2,
  CloneProcess = 3,
  PreviewData = 4,
  ScheduleProcess = 5,
  Archived = 6
}

export interface ToolbarItem {
  actionId: number;
  iconClass: string;
  altText: string;
  state: ToolbarItemStateEnum;
  type: ToolbarItemTypeEnum;
  value?: any;
}

export interface ToolbarGroup {
  items: ToolbarItem[];
  location?: string;
  sequenceNumber: number;
}

export interface Toolbar {
  groups: ToolbarGroup[];
  name: string;
}
