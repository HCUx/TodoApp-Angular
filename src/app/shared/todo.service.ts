import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Todo} from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    ownerid: new FormControl(''),
    createdAt: new FormControl('')
  });


  initializeFormGroup() {
    this.form.setValue({
      id: null,
      title: '',
      ownerid: '',
      createdAt: ''
    });
  }

  getTodos() {
    const id = JSON.parse(localStorage.getItem('currentUser')).id;
    return this.http.get<any>(`${environment.apiUrl}/todos/${id}`);
  }

  insertTodoList(todo) {
    const nowDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
    todo.ownerid = JSON.parse(localStorage.getItem('currentUser')).id;

    return this.http.post<any>(`${environment.apiUrl}/todos`, todo);
  }

  updateTodoList(todo) {
    todo.deadline = this.datePipe.transform(todo.deadline, 'yyyy-MM-dd');
    return this.http.put(`${environment.apiUrl}/todos/${todo.id}`, todo);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${environment.apiUrl}/todos/${id}`);
  }

  populateForm(todolist) {
    this.form.setValue(todolist);
  }
}
