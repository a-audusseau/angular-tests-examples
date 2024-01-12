import { Component, Input } from '@angular/core';
import { Pizza } from '../pizza';

@Component({
  selector: 'app-pizza-ingredient-list',
  standalone: true,
  template: `
    <ul>
      @for (ingredient of pizza.ingredients; track $index) {
      <li>{{ ingredient }}</li>
      }
    </ul>
  `,
})
export class PizzaIngredientListComponent {
  @Input({ required: true }) pizza!: Pizza;
}
