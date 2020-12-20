import {Component, OnInit, Input} from '@angular/core';
import { TodoService } from "../todo.service";
import { TodoItemData } from "../dataTypes/TodoItemData";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() private data: TodoItemData;  // récupère l'item envoyé depuis le component père

  private editing: boolean; // boolean pour savoir quand l'édition d'un item est en cours
  private expired: boolean; // boolean pour savoir si la date d'un item est expirée

  constructor(private todoService: TodoService) {}

  // - initialise les variables de la classe
  ngOnInit() {
    this.editing = false;

    if (this.data.dateLimit) {
      if (new Date() > new Date(this.data.dateLimit)) {
        this.expired = true;
      }
      else {
        this.expired = false;
      }
    }
  }

  // - retourne le nom de l'item
  get label(): string {
    return this.data.label;
  }

  // - retourne le date de l'item lorsqu'il y en a une
  get dateLimit(): string {
    if (this.data.dateLimit != null) {
      var d = new Date(this.data.dateLimit);
      return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    }
    return null;

  }

  // - permet l'édition de l'item
  itemEdition() {
    this.editing = true;
  }

  // - met à jour la valeur isDone de l'item
  itemDone(done:boolean) {
    this.todoService.setItemsDone(done, this.data);

  }

  // - met à jour le label de l'item
  itemLabel(label: string) {
    if (label) {
      this.todoService.setItemsLabel(label, this.data);
    }
    else {
      this.todoService.removeItems(this.data);
    }
  }

  // - supprime l'item
  removeItem() {
    this.todoService.removeItems(this.data);
  }
}
