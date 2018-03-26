import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pagination } from '../../shared.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  @Input() showInfo = true;
  @Output() pageChange = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);  
  }

}
