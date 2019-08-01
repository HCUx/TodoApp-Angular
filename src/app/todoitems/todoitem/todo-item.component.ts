import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../shared/notification.service';
import {TodoItemService} from '../../shared/todoitem.service';
import {EventEmitterService} from '../../shared/EventEmitterService';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  constructor(public service: TodoItemService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<TodoItemComponent>,
    private eventEmitterService: EventEmitterService  ) { }

  ngOnInit() {  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('id').value) {
        this.service.insertTodoItem(this.service.form.value).subscribe(res => {
        if (res) {
          this.notificationService.success(':: Ekleme başarılı');
          this.eventEmitterService.onComponent('loaditemlist');
        } else {
          this.notificationService.warn(':: Ekleme başarısız');
        }
        } );
      } else {
        this.service.updateTodoItem(this.service.form.value).subscribe(res => {
          if (res) {
            this.notificationService.success(':: Güncelleme başarılı');
            this.eventEmitterService.onComponent('loaditemlist');
          } else {
            this.notificationService.warn(':: Güncelleme başarısız');
          }
        } );
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
