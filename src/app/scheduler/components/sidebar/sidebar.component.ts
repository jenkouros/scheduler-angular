import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboardList, faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selected = '';
  constructor(private router: Router) { }

  faItems = faClipboardList;
  faPlanItems = faCalendarAlt;

  ngOnInit() {
    // if (this.selected === '') {
    //   this.router.navigate(['scheduler/planitems']);
    // }
  }

  getScrollHeight(elementRef: ElementRef) {
    return window.innerHeight - elementRef.nativeElement.getBoundingClientRect().top;
  }

}
