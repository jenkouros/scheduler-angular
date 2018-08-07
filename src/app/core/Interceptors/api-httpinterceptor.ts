import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { NotifyService } from '../../shared/services/notify.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor(private notifyService: NotifyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptObservable = new Subject<HttpEvent<any>>();
    const modifiedRequest = request;
    // add auth, culture, ...
    // this.normalizeRequestHeaders(request);

    next.handle(modifiedRequest).subscribe(
        (event: HttpEvent<any>) => {
        this.handleSuccessResponse(event, interceptObservable);

        },
        () => this.notifyService.notifyError('Strežnik ni dosegljiv.')
    );
    return interceptObservable;
  }

  handleErrorResponse(error, interceptObservable) {
    console.log('error ' + error);
    return of({});
  }
  protected handleSuccessResponse(
    event: HttpEvent<any>,
    interceptObservable: Subject<HttpEvent<any>>) {
    if (event instanceof HttpResponse) {
      if (
        event.body &&
        event.body.status &&
        event.body.code
      ) {
        const body = <ApiResponse<any>>event.body;
        const modifiedResponse = this.handleResponse(event, body);
        interceptObservable.next(modifiedResponse);
        interceptObservable.complete();
      } else {
        interceptObservable.next(event);
        interceptObservable.complete();
      }
    }
  }

  handleResponse(httpResponse: HttpResponse<any>, response: ApiResponse<any>) {
    const newResponse: HttpResponse<any> = httpResponse.clone({
        body: response.hasOwnProperty('result')
            ? response.result
            : response.code === ApiResponseResult.success
    });
    if (response.code !== ApiResponseResult.success) {
        this.notifyService.notifyError(response.messages && response.messages.length
          ? response.messages[0]
          : 'Napaka pri procesiranju zahteve.');
        // TODO handle unauth...
    } else {
      // TODO handle redirect
      if (response.messages && response.messages.length) {
        this.notifyService.notifyInfo(response.messages);
      }
    }
    return newResponse;
  }
}
