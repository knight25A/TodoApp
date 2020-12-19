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

    constructor(private todoService: TodoService) {
      console.log("todoapp");

    }

    ngOnInit() {
      console.log("init");
      //this.todoService.setListLabel("test");
    }

    changeTodoList(label: string){
      console.log(label);
      this.todoService.setListLabel(label);
    }

    /*newList() {
      var newTab = document.createElement("li");
      var newTabContent = document.createElementElement("a");
      *
    }*/
}
