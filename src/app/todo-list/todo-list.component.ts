import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
    //private sauvItems: TodoItemData[];
    private filter: string;

    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
    }

    ngOnInit() {
      if (localStorage.getItem("todolist") !== null) {
        this.todoList.items = JSON.parse(localStorage.getItem("todolist"));
      }
      this.filter = 'all';
    }

    get label(): string {
        return this.todoList.label;
    }

    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    get nbUncheckedItems(): number {
        let count = 0;
        let l = this.todoList.items;
        console.log(l);

        l.forEach(element => {
          if (!element.isDone) {
              count++;
          }
        });
        return count;
    }

    filterItems(){
      console.log(this.filter);

      if (this.filter == "actives") {
        return this.items.filter(item => !item.isDone );
      }
      if (this.filter == "completed") {
        return this.items.filter(item => item.isDone);
      }
      if (this.filter == "all") {
        return this.todoList.items;
      }
    }

    appendItem(label: string) {
      this.todoService.appendItems({
        label,
        isDone:false
      });
    }

    itemDone(item: TodoItemData, done:boolean) {
      this.todoService.setItemsDone(done, item);
    }

    itemLabel(item: TodoItemData, label: string) {
      this.todoService.setItemsLabel(label, item);
    }

    removeItem(item: TodoItemData) {
      this.todoService.removeItems(item);
    }

    clearCompleted() {
      this.items.forEach(element => {
        if (element.isDone) {
          this.removeItem(element);
        }
      });
    }
}
