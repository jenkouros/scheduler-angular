import {  Directive, ElementRef, OnDestroy, Input, Output, OnInit, AfterViewInit, Renderer2,
          HostListener, HostBinding, EventEmitter} from '@angular/core';
import * as events from 'devextreme/events';
import { Attribute } from '@angular/compiler';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dx-draggable]'
})
export class DxDraggableDirective {
  @Input() dragData;
  element: HTMLElement;

  // private dragging = false;
  @HostBinding('class.draggable') draggable  = true;
  @HostBinding('draggable')
  get isDraggable() {
    return true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    event.dataTransfer.setData('prePlanItem', JSON.stringify(this.dragData));
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.element = el.nativeElement;

  }
}
