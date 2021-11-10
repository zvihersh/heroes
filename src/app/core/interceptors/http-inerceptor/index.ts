import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCustomInterceptor } from './http-interceptor';

export const httpInterceptProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpCustomInterceptor, multi: true}
];
