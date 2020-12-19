import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{

    private editingTab: boolean;
    private pos: number;

    constructor(private todoService: TodoService) {}

    ngOnInit() {
      this.pos = 1;
      this.editingTab = false;
    }

    changeTodoList(label: string){
      if (localStorage.getItem(label) !== null) {
        this.todoService.setList(label, JSON.parse(localStorage.getItem(label)));
      }
      else {
        this.todoService.setList(label, []);
      }
    }

    newTab() {
      this.editingTab = true;
    }

    addTab(label: string) {
      var tabList = document.getElementsByClassName('navbar');

      var newTab = document.createElement('li');
      var tabContent = document.createElement('a');
      var tabText = document.createTextNode(label);
      tabContent.appendChild(tabText);
      newTab.appendChild(tabContent);

      tabList[0].insertBefore(newTab, tabList[0].childNodes[this.pos]);
      this.pos++;
      this.editingTab = false;
      console.log(tabList[0]);

      //this.todoService.setList(label, []);
    }
}
