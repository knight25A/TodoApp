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
  private editing: boolean;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.editing = false;
  }

  get label(): string {
    return this.data.label;
  }

  itemEdition() {
    this.editing = true;
  }


  itemDone(done:boolean) {
    this.todoService.setItemsDone(done, this.data);

  }

  itemLabel(label: string) {
    if (label) {
      this.todoService.setItemsLabel(label, this.data);
    }
    else {
      this.todoService.removeItems(this.data);
    }
  }

  removeItem() {
    this.todoService.removeItems(this.data);
  }
}
