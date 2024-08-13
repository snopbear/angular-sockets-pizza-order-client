import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizzaOrdersComponent } from './pizza/components/pizza-orders/pizza-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PizzaOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-sockets-pizza-order-client';
}
