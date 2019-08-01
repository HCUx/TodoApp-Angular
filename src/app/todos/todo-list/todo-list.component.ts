import {TodoComponent} from '../todo/todo.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../../shared/todo.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DepartmentService} from '../../shared/department.service';
import {NotificationService} from '../../shared/notification.service';
import {Todo} from '../../_models/todo';
import {Router} from '@angular/router';
import {EventEmitterService} from '../../shared/EventEmitterService';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private route: Router,
              private service: TodoService,
              private departmentService: DepartmentService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private eventEmitterService: EventEmitterService,) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'createdAt', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.LoadAllTodoLists();
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeComponentFunction.subscribe((name: string) => {
        if (name == 'loadtodolist') {
          this.LoadAllTodoLists();
        }
      });
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(TodoComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(TodoComponent, dialogConfig);
  }

  onDelete($key) {
    if (confirm('Kaydı Silmek İstediğinizden Emin misiniz ?')) {
      this.service.deleteEmployee($key).subscribe(res => {
        if (res) {
          this.LoadAllTodoLists();
          this.notificationService.success('! Silme Başarılı');
        } else {
          this.notificationService.warn('! Silme Başarısız');
        }
      });
    }
  }

  private LoadAllTodoLists() {
    this.service.getTodos().subscribe(
      list => {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }

  goTodoItem(todo: Todo) {
    localStorage.setItem('currentTodo', JSON.stringify(todo));
    this.route.navigate(['items']);
  }
}
