import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn : 'root'
})

export class ReverseAuth implements CanActivate{

    constructor(private authService : AuthService,private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user
        .pipe(map(user => {
            const isAuthenticated = !!user;
            if(isAuthenticated){
                return this.router.createUrlTree(['/todo']);
            }
            else{
              return true;
            }
        }));
    }

}
