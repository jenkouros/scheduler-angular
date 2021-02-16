import { CalendarFacade } from './calendar.facade';
import { ItemFacade } from './item.facade';
import { ContainerFacade } from './container.facade';
export const facades = [
  CalendarFacade,
  ItemFacade,
  ContainerFacade
];

export * from './calendar.facade';
export * from './item.facade';
export * from './container.facade';
