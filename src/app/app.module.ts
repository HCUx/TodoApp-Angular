import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todos/todo/todo.component';
import { TodoService } from './shared/todo.service';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { routing } from './app-routing.module';
import {AuthGuard} from './login/_guards';
import {AlertService, AuthenticationService, UserService} from './login/_services';
import {LoginComponent} from './login/login';
import {RegisterComponent} from './login/register';
import {AlertComponent} from './login/_components';
import {TodoItemsComponent} from './todoitems/todo-items.component';
import {TodoItemComponent} from './todoitems/todoitem/todo-item.component';
import {TodoItemListComponent} from './todoitems/todoitem-list/todo-item-list.component';
import {TodoItemService} from './shared/todoitem.service';
import {EventEmitterService} from './shared/EventEmitterService';

@NgModule({
  declarations: [
    TodoItemComponent,
    AppComponent,
    TodosComponent,
    TodoComponent,
    TodoListComponent,
    TodoItemsComponent,
    TodoItemListComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routing, {onSameUrlNavigation: 'reload'})
  ],
  providers: [EventEmitterService, TodoService, TodoItemService,
    DatePipe, AuthGuard, AuthenticationService, AlertService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [TodoComponent, TodoItemComponent]
})
export class AppModule { }
