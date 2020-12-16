import {Component, OnInit, Input} from '@angular/core';
import { TodoService } from "../todo.service";
import { TodoItemData } from "../dataTypes/TodoItemData";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() private data: TodoItemData;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  get label(): string {
    return this.data.label;
  }

  itemTest() {
    console.log("dbclick");
    

  }

  itemDone(done:boolean) {
    this.todoService.setItemsDone(done, this.data);

  }

  itemLabel(label: string) {
    this.todoService.setItemsLabel(label, this.data);
  }

  removeItem() {
    this.todoService.removeItems(this.data);
  }
}
