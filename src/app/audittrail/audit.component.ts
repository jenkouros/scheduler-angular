import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuditModel } from './model/audit.model';
import { AuditService } from './services/audit.service';

@Component({
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit, OnDestroy {
  model: AuditModel;
  subs: Subscription;

  constructor(private auditService: AuditService) {}

  getData(idItem: number) {
    this.subs = this.auditService.getAudit(idItem).subscribe(m => {
      this.model = m;
      console.log(m);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  openNode(idItem: number) {
    this.getData(idItem);
  }



}
