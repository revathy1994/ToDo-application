import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../auth/models/user.model";
import { Todo } from "../todo/models/todo.model";
import { AuthService } from './auth.service'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
    providedIn : 'root'
})

export class TodoService {
    user! : User | null;
    private dbPath = '/todos';
    todoRef! : AngularFireList<Todo>;
    constructor(private http : HttpClient,
      private authService : AuthService,
      private database : AngularFireDatabase){
      this.authService.user.subscribe(user => {
        this.user = user;
        this.todoRef = database.list(this.dbPath+'/'+user?.id)
      });

    }

    storeTodo(data : Todo){
       return this.todoRef.push(data);
    }

    getTodo(){
      return this.todoRef
    }

    deleteTodo(key : string){
      return this.todoRef.remove(key);
    }

    mark(todo : any){
      const updatedTodo : Todo = {
        description : todo.description,
        title : todo.title,
        eventDate : todo.eventDate,
        isCompleted : true,
        addedDate : todo.addedDate,
      }
      return this.todoRef.set(todo.key,updatedTodo);
    }

    updateTodo(todo : any,key : string){
      const updatedTodo : Todo = {
        description : todo.description,
        title : todo.title,
        eventDate : todo.eventDate,
        isCompleted : todo.isCompleted,
        addedDate : new Date().toString()
      }
      return this.todoRef.set(key,updatedTodo);
    }


}
