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
    private sauvItems: TodoItemData[];


    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit() {
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

    filterActives() {
      if (this.sauvItems) {
        this.todoList.items = this.sauvItems;
      }
      console.log(this.todoList.items);

      let test = this.items.filter(item => !item.isDone );
      console.log(test);
      this.sauvItems = this.items;
      this.todoList.items = test;
    }

    filterCompleted() {
      if (this.sauvItems) {
        this.todoList.items = this.sauvItems;
      }
      console.log(this.items);
      let test = this.items.filter(item => item.isDone);
      console.log(test);
      this.sauvItems = this.items;
      this.todoList.items = test;
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
