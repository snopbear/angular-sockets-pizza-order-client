import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { IPizza } from '../models/pizza';
import { IPizzaCount } from '../models/pizza-count';
import { IPizzaOrders } from '../models/pizza-orders';
@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private _socketUrl: string = 'http://localhost:9090/pizza';
  private _socket;
  constructor() {
    this._socket = io(this._socketUrl);
  }
  getPizzaList(): Observable<IPizza[]> {
    return new Observable((observer) => {
      this._socket.on('pizzaList', (pizzas) => {
        observer.next(pizzas);
      });
    });
  }
  getTotalOrdersByPizzaName(): Observable<IPizzaCount[]> {
    return new Observable((observer) => {
      this._socket.on('pizzaOrdersCount', (pizzaCount) => {
        observer.next(pizzaCount);
      });
    }); 
  }
  newPizzaOrder(order: IPizzaOrders): void {
    this._socket.emit('newPizzaOrder', order);
  }
}
