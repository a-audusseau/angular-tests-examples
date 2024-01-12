import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaService } from './pizza.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, PizzaComponent],
  template: `
    @for (pizza of pizzas$ | async; track pizza.id) {
    <app-pizza [pizza]="pizza" />
    }
  `,
})
export class AppComponent {
  public readonly pizzas$ = this.pizzaService.pizzas$;

  constructor(private readonly pizzaService: PizzaService) {}
}
