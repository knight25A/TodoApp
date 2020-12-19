import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );

  constructor() { }

  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setListLabel(label: string) {
    this.todoListSubject.getValue().label = label;

  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, dateLimit: I.dateLimit, isDone: I.isDone}) )
    });
    localStorage.setItem(this.todoListSubject.getValue().label, JSON.stringify(this.todoListSubject.getValue().items));
  }

  setItemsDate(dateLimit: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, dateLimit, isDone: I.isDone}) )
    });
    localStorage.setItem(this.todoListSubject.getValue().label, JSON.stringify(this.todoListSubject.getValue().items));
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, dateLimit: I.dateLimit, isDone}) )
    });
    localStorage.setItem(this.todoListSubject.getValue().label, JSON.stringify(this.todoListSubject.getValue().items));
  }
  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    localStorage.setItem(this.todoListSubject.getValue().label, JSON.stringify(this.todoListSubject.getValue().items));
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    localStorage.setItem(this.todoListSubject.getValue().label, JSON.stringify(this.todoListSubject.getValue().items));
  }

}
