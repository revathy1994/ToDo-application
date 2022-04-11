import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../auth/models/user.model";

export interface AuthResponse{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : boolean;
}

@Injectable({
    providedIn : 'root'
})
export class AuthService {
    user = new BehaviorSubject<User | null>(null);
    private expirationTimer! : any;

    constructor(private http : HttpClient,private router : Router){}

    SignUp(data : {email : string,password : string}){
        let signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseApiKey;
        return this.http.post<AuthResponse>(signUpUrl,{
            email : data.email,
            password : data.password,
            returnSecureToken : true
        }).pipe(
            catchError(this.handleError),
            tap((response) => {
               this.handleAuth(response.email,response.idToken,response.localId,+response.expiresIn);
            })
        )
    }

    SignIn(data : {email : string,password : string}){
        let signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseApiKey;
        return this.http.post<AuthResponse>(signInUrl,{
            email : data.email,
            password : data.password,
            returnSecureToken : true
        }).pipe(
            catchError(this.handleError),
            tap((response) => {
                this.handleAuth(response.email,response.idToken,response.localId,+response.expiresIn);
            })
        )
    }

    Logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.expirationTimer){
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
    }

    private handleError(error : HttpErrorResponse){
        let errorMessage = 'An unknown error occured..!';
        if(!error.error || !error.error.error){
            return throwError(errorMessage);
        }
        switch(error.error.error.message){
            case 'EMAIL_NOT_FOUND' : errorMessage = "Email not Found..!";
                break;
            case 'INVALID_PASSWORD' : errorMessage = "Invalid Password..!";
                break;
            case 'EMAIL_EXISTS' : errorMessage = "Email already Exists..!";
                break;
        }
        return throwError(errorMessage);
    }

    AutoLogin(){

        const userData : {
            email : string,
            id : string,
            _token : string,
             _tokenExpirationDate : string} = JSON.parse(localStorage.getItem('user')!);
        if(!userData){
            return;
        }
        const user = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(user.token){
            this.user.next(user);
            const remainingTime = new Date(new Date(userData._tokenExpirationDate)).getTime() - new Date().getTime();
            this.AutoLogout(remainingTime);
        }
    }

    AutoLogout(expirationTime : number){
       this.expirationTimer = setTimeout(() => {
            this.Logout();
       },expirationTime);
    }

    private handleAuth(email : string,token : string,localId : string,expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email,localId,token,expirationDate);
        this.user.next(user);
        this.AutoLogout(expiresIn * 1000);
        localStorage.setItem('user',JSON.stringify(user));
    }
}
