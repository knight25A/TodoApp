import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-tab',
  templateUrl: './todo-tab.component.html',
  styleUrls: ['./todo-tab.component.css']
})
export class TodoTabComponent implements OnInit {
  @Input() private name: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  get tabLabel(): string {
    return this.name;
  }

  changeTodoList(label: string){
    if (localStorage.getItem(label) !== null) {
      this.todoService.setList(label, JSON.parse(localStorage.getItem(label)));
    }
    else {
      this.todoService.setList(label, []);
    }
  }

}
