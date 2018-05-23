import {  Directive, ElementRef, OnDestroy, Input, Output, OnInit, AfterViewInit, Renderer2,
          HostListener, HostBinding, EventEmitter} from '@angular/core';
import * as events from 'devextreme/events';
import { Attribute } from '@angular/compiler';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';


@Directive({
  selector: '[appPreplanitemDraggable]'
})
export class PreplanitemDraggableDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('appPreplanitemDraggable') dragData;
  element: HTMLElement;


  // private dragging = false;
  @HostBinding('class.draggable') draggable  = true;
  @HostBinding('draggable')
  get isDraggable() {
    return true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    this.store.dispatch(new fromStore.DragStartPreplanItem(this.dragData));
    event.dataTransfer.setData('prePlanItem', JSON.stringify(this.dragData));
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    this.store.dispatch(new fromStore.DragEndPreplanItem(this.dragData));
  }

  constructor(private el: ElementRef, private renderer: Renderer2,
    private store: Store<fromStore.SchedulerState>) {
    this.element = el.nativeElement;

  }
}
