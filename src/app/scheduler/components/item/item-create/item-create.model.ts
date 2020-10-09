export interface CreateSubItemInput {
  code: string;
  name: string;
  sequenceNumber: number;
}

export interface CreateItemInput {
  code: string;
  name: string;
  subItems: CreateSubItemInput[];
  filterIds: string;
  filterValues: string;
}
