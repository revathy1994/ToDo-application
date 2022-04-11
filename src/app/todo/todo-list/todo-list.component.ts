import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../models/todo.model';
import { TodoCreateComponent } from '../todo-create/todo-create.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList! : any[];
  filterOptions = [
    "All",
    "Completed",
    "OnGoing"
  ];
  filteredList : any[] = [];
  filterValue = "OnGoing";
  constructor(
    private todoService : TodoService,
    private loadingService : LoadingService,
    private dialog : MatDialog,
    private _matSnackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTodo();
  }

  getAllTodo(){
    this.loadingService.show();
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
      this.todoList = data;
      this.onFilterChange();
      this.loadingService.hide();
    },
    err => {
      this.openSnackBar(err);
      this.loadingService.hide();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoCreateComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTodo();
    });
  }

  delete(key : any){
    this.todoService.deleteTodo(key).then(() => {
      this.openSnackBar('Deleted Successfully.')
      this.getAllTodo();
    })
  }
  mark(todo : Todo){
    this.todoService.mark(todo).then(() => {
      this.openSnackBar('Completed Successfully.')
      this.getAllTodo();
    })
  }

  update(todo : Todo){
    debugger
    const dialogRef = this.dialog.open(TodoCreateComponent, {
      width: '500px',
      data : todo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTodo();
    });
  }

  openSnackBar(message: string) {
    this._matSnackBar.open(message, 'Close');
  }

  onFilterChange(){
    if(this.filterValue == "All"){
      this.filteredList = this.todoList;
    }
    else if(this.filterValue == "OnGoing"){
      this.filteredList = this.todoList.filter((e : any) => e.isCompleted == false);
    }
    else{
      this.filteredList = this.todoList.filter((e : any) => e.isCompleted == true);
    }
  }

}

