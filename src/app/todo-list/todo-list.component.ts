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

    private todoList: TodoListData;     // liste des items courants
    private filter: string;             // nom du filtre en cours
    private allCompleted: boolean;      // boolean pour savoir si les items sont tous cochés

    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
    }

    ngOnInit() {
      // - on vérifie à l'initialisation de la liste si des items existent dans le localStorage
      if (localStorage.getItem(this.todoList.label) !== null) {
        this.todoList.items = JSON.parse(localStorage.getItem(this.todoList.label));
      }

      // - on initialise les variables de la classe
      this.filter = 'all';
      this.allCompleted = false;
    }

    // - retourne le nom de la liste
    get label(): string {
        return this.todoList.label;
    }

    // - retourne les items de la liste
    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    // - retourne le nombre d'item non coché de la liste
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

    // - applique les filtres sur la liste
    filterItems(){
      if (this.filter == "actives") {
        return this.items.filter(item => !item.isDone );    // affiche uniquement les items non cochés
      }
      if (this.filter == "completed") {
        return this.items.filter(item => item.isDone);     // affiche uniquement les items cochés
      }
      if (this.filter == "all") {
        return this.todoList.items;                       // affiche tout les items
      }
    }

    // - retourne vrai si au moins un item est coché, faux sinon
    hasCompleted(): boolean{
      let bool = false;
      this.items.forEach(item => {
        if (item.isDone) {
            bool = true;
        }
      });
      return bool;
    }

    // - ajoute un item à la liste
    appendItem(label: string, date: string) {
      if (date != "") {
        this.todoService.appendItems({
          label,
          dateLimit: date,
          isDone:false
        });
      }
      else {
        this.todoService.appendItems({
          label,
          dateLimit: null,
          isDone:false
        });
      }
    }

    // - efface les items cochés de la liste
    clearCompleted() {
      this.items.forEach(item => {
        if (item.isDone) {
          this.todoService.removeItems(item);
        }
      });
    }

    // - efface tous les items de la liste
    clearAll() {
      this.items.forEach(item => {
        this.todoService.removeItems(item)
      });
    }

    // - coche tous les items de la liste, ou les décoche tous
    completedAll() {
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
