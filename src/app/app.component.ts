import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-angular';
  loading$! : Observable<boolean>;

  constructor(
    private authService : AuthService,
    private loadingService : LoadingService
  ){}

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
    this.authService.AutoLogin();
  }
}
