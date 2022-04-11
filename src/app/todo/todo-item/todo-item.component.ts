import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo! : Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() mark = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.delete.emit(this.todo.key);
  }

  onMark(){
    this.mark.emit(this.todo);
  }

  onUpdate(){
    this.update.emit(this.todo);
  }

}
