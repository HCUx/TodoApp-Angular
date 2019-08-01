import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TodoItem} from '../_models/todoitem';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  array: string;

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    completed: new FormControl(false),
    parentListId: new FormControl(''),
    linkedItemId: new FormControl(''),
    linkedItemName: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      title: '',
      desc: '',
      deadline: '',
      completed: false,
      parentListId: '',
      linkedItemId: '',
      linkedItemName: ''
    });
  }

  getTodoItem(pid: string) {
    return this.http.get<any>(`${environment.apiUrl}/getitems/` + pid);
  }

  getLinkedName(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/oneitem/` + id);
  }

  insertTodoItem(todo) {
    todo.deadline = this.datePipe.transform(todo.deadline, 'yyyy-MM-dd');
    todo.parentListId = JSON.parse(localStorage.getItem('currentTodo')).id;
    return this.http.post<TodoItem>(`${environment.apiUrl}/additem`, todo);
  }

  updateTodoItem(todo) {
    todo.deadline = this.datePipe.transform(todo.deadline, 'yyyy-MM-dd');
    return this.http.put(`${environment.apiUrl}/upitem/${todo.id}`, todo);
  }

  deleteItem(id: string) {
    return this.http.delete(`${environment.apiUrl}/delitem/${id}`);
  }

  populateForm(todolist) {
    this.form.setValue(todolist);
  }
}
