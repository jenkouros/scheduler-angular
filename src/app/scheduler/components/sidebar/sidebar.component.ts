import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selected = '';
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.selected === '') {
      this.router.navigate(['scheduler/planitems']);
    }
  }

}
