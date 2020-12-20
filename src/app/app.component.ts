import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';
import { TodoTabComponent } from "./todo-tab/todo-tab.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{

    private tabList: string[];
    private editingTab: boolean;

    constructor(private todoService: TodoService) {
      if (localStorage.getItem("tabs") !== null) {
        this.tabList = JSON.parse(localStorage.getItem("tabs"));
      }
      else {
        this.tabList = [this.todoService.getTodoListData().label];
      }

      if (localStorage.getItem(this.tabList[0]) !== null) {
        this.todoService.setList(this.tabList[0], JSON.parse(localStorage.getItem(this.tabList[0])));
      }
      else {
        this.todoService.setList(this.tabList[0], []);
      }
    }

    ngOnInit() {
      this.editingTab = false;
    }

    label(i): string {
      return this.tabList[i];
    }

    get tabs(): string[] {
      return this.tabList;
    }

    newTab() {
      this.editingTab = true;
    }

    addTab(label: string) {
      this.editingTab = false
      this.tabList.push(label);
      if (localStorage.getItem(label) !== null) {
        this.todoService.setList(label, JSON.parse(localStorage.getItem(label)));
      }
      else {
        this.todoService.setList(label, []);
      }

      localStorage.setItem("tabs", JSON.stringify(this.tabList));
    }

    removeTab(i) {
      localStorage.removeItem(this.tabList[i]);
      this.tabList.splice(i,1);
      console.log(this.tabList);
      localStorage.setItem("tabs", JSON.stringify(this.tabList));
    }
}
