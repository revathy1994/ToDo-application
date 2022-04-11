import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error = ''
  authForm! : FormGroup;
  isLogin = true;
  constructor(
    private authService : AuthService,
    private router : Router,
    private loadingService : LoadingService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.authForm = new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    });
  }

  submit(){
    if(this.authForm.valid){
      this.loadingService.show();
      if(this.isLogin){
        this.authService.SignIn(this.authForm.value).subscribe(response => {
          this.loadingService.hide();
          this.router.navigate(['/todo']);
        },
        err => {
          this.loadingService.hide();
          this.openSnackBar(err);
        });
      }
      else{
        this.authService.SignUp(this.authForm.value).subscribe(response => {
          this.router.navigate(['/todo']);
        },
        err => {
          this.loadingService.hide();
          this.openSnackBar(err);
        });
      }
    }
    else{
      this.authForm.markAllAsTouched();
    }
  }

  toggleLogin(){
    this.authForm.reset();
    this.isLogin = !this.isLogin;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

}
