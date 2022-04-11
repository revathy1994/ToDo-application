import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../models/todo.model';
export interface DialogData{
  title : string;
  description : string;
  eventDate : Date;
  key : string;
}
@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todoForm! : FormGroup;
  isEdit = false;
  constructor(
    public dialogRef: MatDialogRef<TodoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private todoService : TodoService,
    private _matSnackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      'title' : new FormControl('',[Validators.required]),
      'description' : new FormControl('',[Validators.required]),
      'eventDate' : new FormControl('',[Validators.required])
    })

    if(this.data){
      this.isEdit = true;
      this.todoForm.patchValue({
        title : this.data.title,
        description : this.data.description,
        eventDate : new Date(this.data.eventDate)
      });
    }
  }

  submit(){
    if(this.todoForm.valid){
      if(!this.isEdit){
        const formData = this.todoForm.value;
        const todo : Todo = {
          description : formData.description,
          eventDate : formData.eventDate.toString(),
          title : formData.title,
          isCompleted : false,
          addedDate : new Date().toString()
        }
        this.todoService.storeTodo(todo).then(() => {
          this.openSnackBar('Created Successfully.')
          this.dialogRef.close();
        });

      }
      else{
        const formData = this.todoForm.value;
        const todo : Todo = {
          description : formData.description,
          eventDate : formData.eventDate.toString(),
          title : formData.title,
          isCompleted : false,
          addedDate : new Date().toString()
        }
        this.todoService.updateTodo(todo,this.data.key).then(() => {
          this.openSnackBar('Updated Successfully.')
          this.dialogRef.close();
        })
      }
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this._matSnackBar.open(message, 'Close');
  }

}
