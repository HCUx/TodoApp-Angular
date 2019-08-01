import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {TodoService} from '../../shared/todo.service';
import {DepartmentService} from '../../shared/department.service';
import {NotificationService} from '../../shared/notification.service';
import {EventEmitterService} from '../../shared/EventEmitterService';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService ,
              public service: TodoService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<TodoComponent>) { }



  ngOnInit() {
    // this.service.getTodos();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('id').value) {
        this.service.insertTodoList(this.service.form.value).subscribe(res => {
          if (res) {
            this.notificationService.success(':: Ekleme başarılı');
            this.eventEmitterService.onComponent('loadtodolist');
          } else {
            this.notificationService.warn(':: Ekleme başarısız');
          }
        });
      } else {
        this.service.updateTodoList(this.service.form.value).subscribe(res => {
          if (res) {
          this.notificationService.success(':: Güncelleme başarılı');
          this.eventEmitterService.onComponent('loadtodolist');
        } else {
          this.notificationService.warn(':: Güncelleme başarısız');
        }
      });
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Gönderme başarılı');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
