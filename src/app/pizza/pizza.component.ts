import { Component, Input } from '@angular/core';
import { Pizza } from '../pizza';
import { AsyncPipe } from '@angular/common';
import { PizzaIngredientListComponent } from '../pizza-ingredient-list/pizza-ingredient-list.component';
import { PizzaService } from '../pizza.service';
import { Observable, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [AsyncPipe, PizzaIngredientListComponent],
  styles: `
    .red { color: red; }
  `,
  template: `
    <h2 class="title" [class.red]="!pizza.isAvailable">{{ pizza.name }}</h2>

    <app-pizza-ingredient-list [pizza]="pizza" />

    @if (isInCart$ | async) {
    <p>In the cart</p>
    } @else { @if (pizza.isAvailable) {
    <button (click)="addToCart()" data-test="add-to-card">Add to card</button>
    } @else {
    <p>Currently not available</p>
    } }
  `,
})
export class PizzaComponent {
  @Input({ required: true }) pizza!: Pizza;

  public readonly isInCart$: Observable<boolean> = this.pizzaService.cart$.pipe(
    map((cart) => !!cart.find(({ id }) => id === this.pizza.id)),
    distinctUntilChanged()
  );

  constructor(private readonly pizzaService: PizzaService) {}

  public addToCart(): void {
    if (this.pizza.cost > 12) {
      console.log('wow this is expensive');
    }

    this.pizzaService.addToCard(this.pizza);
  }
}
