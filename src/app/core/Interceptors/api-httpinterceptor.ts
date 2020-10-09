import { ApplicationFacadeService } from './../../store/application/application-facade.service';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { NotifyService } from '../../shared/services/notify.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  requestCounter = 0;
  constructor(
    private notifyService: NotifyService,
    private applicationFacade: ApplicationFacadeService,
    private router: Router) {}


  // setLoader(add: boolean) {
  //   this.requestCounter = this.requestCounter + (add ? 1 : -1);
  //   this.requestCounter = Math.max(0, this.requestCounter);
  //   this.applicationFacade.setLoader(this.requestCounter > 0);
  // }
  setLoader(add: boolean) {
    this.applicationFacade.setLoader(add);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptObservable = new Subject<HttpEvent<any>>();
    const modifiedRequest = request;
    // add auth, culture, ...
    // this.normalizeRequestHeaders(request);
    this.setLoader(true);

    next.handle(modifiedRequest).subscribe(
      (event: HttpEvent<any>) => {
        this.handleSuccessResponse(event, interceptObservable);
      },
      (err) => {
        this.setLoader(false);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        } else {
          this.notifyService.notifyError('Strežnik ni dosegljiv.');
        }

      }
    );
    return interceptObservable;
  }

  handleErrorResponse(error, interceptObservable) {
    // console.log('error ' + error);
    return of({});
  }
  protected handleSuccessResponse(
    event: HttpEvent<any>,
    interceptObservable: Subject<HttpEvent<any>>
  ) {
    if (event instanceof HttpResponse) {
      this.setLoader(false);
      if (event.body && event.body.status && event.body.code) {
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
      this.notifyService.notifyError(
        response.messages && response.messages.length
          ? response.messages[0]
          : 'Napaka pri procesiranju zahteve.'
      );
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
