import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService : AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return  this.authService.user
        .pipe(take(1),
        exhaustMap((response) => {
            if(response === null){
                return next.handle(req);
            }
            console.log("Interceptor:")
            console.log(response);
            const modifiedReq = req.clone({params : new HttpParams().set('auth',<string>response.token)})
            return next.handle(modifiedReq);
        }))
    }

}
