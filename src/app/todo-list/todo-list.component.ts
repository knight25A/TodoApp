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
    private allCompleted : boolean;

    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
    }

    ngOnInit() {
      if (localStorage.getItem("todolist") !== null) {
        this.todoList.items = JSON.parse(localStorage.getItem("todolist"));
      }

      this.filter = 'all';
      this.allCompleted = false;
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
        l.forEach(element => {
          if (!element.isDone) {
              count++;
          }
        });
        return count;
    }

    filterItems(){
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

    hasCompleted(){
      let bool = false;
      this.items.forEach(item => {
        if (item.isDone) {
            bool = true;
        }
      });
      return bool;
    }

    appendItem(label: string) {
      this.todoService.appendItems({
        label,
        isDone:false
      });
    }

    clearCompleted() {
      this.items.forEach(element => {
        if (element.isDone) {
          this.removeItem(element);
        }
      });
    }

    completedAll(){
      this.items.forEach(item => {
        if (this.allCompleted) {
          this.todoService.setItemsDone(false, item);
        }
        else {
          this.todoService.setItemsDone(true, item);
        }
      });
      this.allCompleted = (this.allCompleted) ? false : true;
    }
}
