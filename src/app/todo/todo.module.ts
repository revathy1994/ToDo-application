import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TodoCreateComponent } from "./todo-create/todo-create.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoRoutingModule } from "./todo.routing.module";

@NgModule({
  imports : [
    TodoRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [
    TodoListComponent,
    TodoItemComponent,
    TodoCreateComponent
  ],
  declarations : [
    TodoListComponent,
    TodoItemComponent,
    TodoCreateComponent
  ]
})
export class TodoModule{

}
