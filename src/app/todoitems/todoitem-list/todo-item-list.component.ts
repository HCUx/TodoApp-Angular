import {TodoItemComponent} from '../todoitem/todo-item.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../shared/notification.service';
import {TodoItemService} from '../../shared/todoitem.service';
import {Todo} from '../../_models/todo';
import {EventEmitterService} from '../../shared/EventEmitterService';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css']
})
export class TodoItemListComponent implements OnInit {
  plist: Array<any>;

  constructor(private eventEmitterService: EventEmitterService,
              private service: TodoItemService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'desc', 'deadline', 'completed', 'linkedItemName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  todo: Todo;
  ngOnInit() {
    this.todo = JSON.parse(localStorage.getItem('currentTodo'));
    this.LoadAllTodoItems();
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeComponentFunction.subscribe((name: string) => {
        if (name == 'loaditemlist') {
          this.LoadAllTodoItems();
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
    dialogConfig.height = '50%';
    this.dialog.open(TodoItemComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(TodoItemComponent, dialogConfig);
  }

  onDelete($key) {
    if (confirm('Kaydı Silmek İstediğinizden Emin misiniz ?')) {
    this.service.deleteItem($key).subscribe(res => {
      if (res) {
        this.LoadAllTodoItems();
        this.notificationService.success('! Silme Başarılı');
      } else {
        this.notificationService.warn('! Silme Başarısız');
      }
    });
    }
  }

  public LoadAllTodoItems() {
    this.service.getTodoItem(this.todo.id).subscribe(
      list => {
        this.service.array = list;
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            // tslint:disable-next-line:triple-equals
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }
}
