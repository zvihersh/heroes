import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(take(1), map(user => user?.token), switchMap(token => {
            if (token) {
                req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
            }
            return next.handle(req);
        }));
    }
}
