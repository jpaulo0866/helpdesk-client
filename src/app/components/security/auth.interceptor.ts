import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    shared: SharedService;

    constructor() {
        this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest: any;

        if (this.shared.isLoggedIn()) {
            authRequest = req.clone({
                setHeaders: {
                    Authorization: this.shared.token
                }
            });
            return next.handle(authRequest).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.status === 401) {
                            this.shared.token = null;
                            this.shared.user = null;
                            window.location.href = '/login';
                            window.location.reload();
                        }
                    }
                    return event;
                }));
        } else {
            return next.handle(req);
        }
    }
}
