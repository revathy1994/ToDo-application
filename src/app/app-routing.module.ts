import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReverseAuth } from './services/reverse-auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'auth',
    pathMatch : 'full'
  },
  {
    path : 'auth',
    canActivate : [ReverseAuth],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path : 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path : '**',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
