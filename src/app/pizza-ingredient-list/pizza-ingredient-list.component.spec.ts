import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../pizza';
import { PizzaIngredientListComponent } from '../pizza-ingredient-list/pizza-ingredient-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('PizzaIngredientListComponent', () => {
  let spectator: Spectator<PizzaIngredientListComponent>;

  const pizza: Pizza = {
    id: 2,
    name: 'Pepperoni Paradise',
    cost: 12,
    ingredients: ['Tomato', 'Mozzarella', 'Pepperoni'],
    isAvailable: true,
  };

  const createComponent = createComponentFactory(PizzaIngredientListComponent);

  beforeEach(() => (spectator = createComponent({ props: { pizza } })));

  it('should display the ingredients list', () => {
    const liElements = spectator.queryAll('li');
    expect(liElements).toHaveLength(pizza.ingredients.length);
    pizza.ingredients.forEach((ingredient, index) =>
      expect(liElements.at(index)).toHaveExactText(ingredient)
    );
  });
});
