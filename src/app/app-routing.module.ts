import { Routes} from '@angular/router';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './login/register';
import { AuthGuard } from './login/_guards';
import {TodosComponent} from './todos/todos.component';
import {TodoItemsComponent} from './todoitems/todo-items.component';

const appRoutes: Routes = [
  { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'items', component: TodoItemsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'todos' }
];

export const routing = appRoutes;
