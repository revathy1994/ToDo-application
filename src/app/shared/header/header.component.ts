import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub? : Subscription;
  isAuthenticated = false;
  notifications : any = [];
  user! : User | null;
  constructor(
    private authService : AuthService,
    private todoService : TodoService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
      this.user = user;
      this.getAllTodo();
    });
  }

  logout(){
    this.authService.Logout();
  }

  getAllTodo(){
    this.todoService.getTodo().snapshotChanges()
    .pipe(
      delay(0),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    )
    .subscribe(data => {
      this.notifications = [];
      data.forEach(element => {
        if(new Date(element.eventDate!).getDate() == new Date().getDate() && element.isCompleted == false){
          this.notifications.push(element.title);
        }
      });
    },
    err => {

    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
