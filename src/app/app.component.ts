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

    private tabList: string[];    // liste des noms des onglets
    private editingTab: boolean;  // boolean pour savoir lorsqu'un onglet et en cours de créeation

    constructor(private todoService: TodoService) {
      // vérifie si des onglets sont enregistrés dans le localStorage et initialise la liste d'onglet
      if (localStorage.getItem("tabs") !== null) {
        this.tabList = JSON.parse(localStorage.getItem("tabs"));
      }
      else {
        this.tabList = [this.todoService.getTodoListData().label];
      }

      // vérifie si des items pour le premier onglet sont enregistrés dans le localStorage et initialise la la todolist
      if (localStorage.getItem(this.tabList[0]) !== null) {
        this.todoService.setList(this.tabList[0], JSON.parse(localStorage.getItem(this.tabList[0])));
      }
      else {
        this.todoService.setList(this.tabList[0], []);
      }
    }

    // - initialise les variabls de la classe
    ngOnInit() {
      this.editingTab = false;
    }

    // - retourne le nom de l'onglet
    label(i): string {
      return this.tabList[i];
    }

    // - retourne la liste des onglets
    get tabs(): string[] {
      return this.tabList;
    }

    // - ouvre l'édition d'un onglet
    newTab() {
      this.editingTab = true;
    }

    // - ajoute l'onglet à la liste et l'enregistre dans le localStorage
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

    // - supprime l'onglet 
    removeTab(i) {
      localStorage.removeItem(this.tabList[i]);
      this.tabList.splice(i,1);
      console.log(this.tabList);
      localStorage.setItem("tabs", JSON.stringify(this.tabList));
    }
}
