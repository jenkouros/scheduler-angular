import { Subscription } from 'rxjs';
import { AuditModel } from './model/audit.model';
import { AuditService } from './services/audit.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
    this.getData(59781);
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
