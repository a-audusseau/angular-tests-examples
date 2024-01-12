import { AppComponent } from './app.component';
import {
  Spectator,
  createComponentFactory,
  createSpyObject,
} from '@ngneat/spectator/jest';
import { PizzaService } from './pizza.service';
import { BehaviorSubject } from 'rxjs';
import { Pizza } from './pizza';
import { PizzaComponent } from './pizza/pizza.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const pizzas: Pizza[] = [
    {
      id: 2,
      name: 'Pepperoni Paradise',
      cost: 12,
      ingredients: ['Tomato', 'Mozzarella', 'Pepperoni'],
      isAvailable: true,
    },
    {
      id: 5,
      name: 'Pesto Perfection',
      cost: 13,
      ingredients: ['Sour cream', 'Mozzarella', 'Pesto'],
      isAvailable: false,
    },
  ];
  const pizzas$ = new BehaviorSubject<Pizza[]>(pizzas);
  const pizzaService = createSpyObject(PizzaService, { pizzas$ });

  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [{ provide: PizzaService, useValue: pizzaService }],
    overrideComponents: [
      [
        AppComponent,
        {
          add: { imports: [MockComponent(PizzaComponent)] },
          remove: { imports: [PizzaComponent] },
        },
      ],
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should display pizza list', () => {
    const pizzaCompList = spectator.queryAll(PizzaComponent);
    expect(pizzaCompList).toHaveLength(pizzas.length);
    pizzas.forEach((pizza, index) =>
      expect(pizzaCompList.at(index)?.pizza).toEqual(pizza);
    );
  });
});
