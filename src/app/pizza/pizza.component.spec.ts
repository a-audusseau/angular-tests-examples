import { BehaviorSubject } from 'rxjs';
import { Pizza } from '../pizza';
import { PizzaIngredientListComponent } from '../pizza-ingredient-list/pizza-ingredient-list.component';
import { PizzaService } from '../pizza.service';
import { PizzaComponent } from './pizza.component';
import {
  Spectator,
  byText,
  createComponentFactory,
  createSpyObject,
} from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

describe('PizzaComponent', () => {
  let spectator: Spectator<PizzaComponent>;

  const cart$ = new BehaviorSubject<Pizza[]>([]);
  const pizzaService = createSpyObject(PizzaService, { cart$ });
  const pizza: Pizza = {
    id: 2,
    name: 'Pepperoni Paradise',
    cost: 12,
    ingredients: ['Tomato', 'Mozzarella', 'Pepperoni'],
    isAvailable: true,
  };

  const createComponent = createComponentFactory({
    component: PizzaComponent,
    providers: [{ provide: PizzaService, useValue: pizzaService }],
    overrideComponents: [
      [
        PizzaComponent,
        {
          add: { imports: [MockComponent(PizzaIngredientListComponent)] },
          remove: { imports: [PizzaIngredientListComponent] },
        },
      ],
    ],
  });

  const addToCardSelector = '[data-test="add-to-card"]';
  const titleSelector = '.title';

  beforeEach(() => (spectator = createComponent({ props: { pizza } })));

  it('should display the pizza name', () => {
    expect(spectator.query(titleSelector)).toBeTruthy();
    expect(spectator.query(titleSelector)).toHaveExactText(pizza.name);
    expect(spectator.query(titleSelector)).not.toHaveClass('red');
  });

  describe('when the pizza is not available', () => {
    beforeEach(() =>
      spectator.setInput({ pizza: { ...pizza, isAvailable: false } })
    );

    it('should add the class red to the title ', () => {
      expect(spectator.query(titleSelector)).toHaveClass('red');
    });
  });

  it('should display the pizza ingredient list', () => {
    expect(spectator.query(PizzaIngredientListComponent)).toBeTruthy();
    expect(spectator.query(PizzaIngredientListComponent)?.pizza).toEqual(pizza);
  });

  describe('when the pizza is in the cart', () => {
    beforeEach(() => {
      cart$.next([pizza]);
      spectator.detectChanges();
    });

    it('should display a message to indicate it', () => {
      expect(spectator.query(byText('In the cart'))).toBeTruthy();
      expect(spectator.query(byText('Currently not available'))).toBeFalsy();
      expect(spectator.query(addToCardSelector)).toBeFalsy();
    });
  });

  describe('when the pizza is not in the cart', () => {
    beforeEach(() => {
      cart$.next([]);
      spectator.detectChanges();
    });

    describe('and it is available', () => {
      beforeEach(() =>
        spectator.setInput({ pizza: { ...pizza, isAvailable: true } })
      );

      it('should display the add to card button', () => {
        expect(spectator.query(addToCardSelector)).toBeTruthy();
        expect(spectator.query(addToCardSelector)).toHaveExactText(
          'Add to card'
        );
        expect(spectator.query(byText('In the cart'))).toBeFalsy();
        expect(spectator.query(byText('Currently not available'))).toBeFalsy();
      });

      describe('and the add to card button is clicked', () => {
        beforeEach(() => spectator.click(addToCardSelector));

        it('should call the PizzaService addToCard method', () => {
          expect(pizzaService.addToCard).toHaveBeenCalledWith(pizza);
        });
      });

      describe('and the add to card button is clicked with a pizza cost over 12', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockReturnValue();

        beforeEach(() => {
          spectator.setInput({
            pizza: { ...pizza, isAvailable: true, cost: 18 },
          });
          spectator.click(addToCardSelector);
        });

        it('should call the PizzaService addToCard method and log a message', () => {
          expect(consoleSpy).toHaveBeenCalledWith('wow this is expensive');
          expect(pizzaService.addToCard).toHaveBeenCalledWith(pizza);
        });
      });
    });

    describe('and it is unavailable', () => {
      beforeEach(() =>
        spectator.setInput({ pizza: { ...pizza, isAvailable: false } })
      );

      it('should display the unavailable message', () => {
        expect(spectator.query(byText('Currently not available'))).toBeTruthy();
        expect(spectator.query(addToCardSelector)).toBeFalsy();
        expect(spectator.query(byText('In the cart'))).toBeFalsy();
      });
    });
  });
});
