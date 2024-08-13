import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../service/pizza.service';
import { IPizzaCount } from '../../models/pizza-count';
import { IPizza } from '../../models/pizza';
import { IPizzaOrders } from '../../models/pizza-orders';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pizza-orders',
  templateUrl: './pizza-orders.component.html',
  styleUrls: ['./pizza-orders.component.css'],
  standalone:true,
  imports: [NgIf,NgFor,CurrencyPipe]
})
export class PizzaOrdersComponent implements OnInit {
  constructor(private _pizzaService: PizzaService) {}
  title: string = 'Order Your Pizza!';
  pizzaCountTitle: string = 'How many people order which pizza!!!';
  pizzaCountByName: IPizzaCount[] = [];
  pizzas: IPizza[] = [];
  ngOnInit(): void {
    this._pizzaService.getPizzaList().subscribe(
      (pizzaList) => (this.pizzas = pizzaList),
      (err) => console.log(err)
    );
    this._pizzaService.getTotalOrdersByPizzaName().subscribe(
      (pizzasCount) => (this.pizzaCountByName = pizzasCount),
      (err) => console.log(err)
    );
  }
  onOrderSubmit(order: IPizza): void {
    let pizzaOrder: IPizzaOrders = {
      pizzaId: order.pizzaId,
      pizzaName: order.pizzaName,
      orderDate: new Date(),
    };
    this._pizzaService.newPizzaOrder(pizzaOrder); 
  }
}
