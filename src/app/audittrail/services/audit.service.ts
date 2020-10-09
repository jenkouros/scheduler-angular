import { AuditModel, AuditModelServer } from './../model/audit.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuditService {
  constructor(private http: HttpClient) {}

  getAudit(idItem: number) {
    return this.http.get<AuditModelServer>(`${environment.apiUrl}/audit?idItem=${idItem}`).pipe(
      map(response => AuditModel.fromServer(response))
    );
  }
}
