import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth/auth.component";

const routes : Routes = [
  {
    path : '',
    component : AuthComponent
  }
]

@NgModule({
  declarations : [
    AuthComponent
  ],
  imports : [
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports : [
    AuthComponent
  ]
})
export class AuthModule{

}
