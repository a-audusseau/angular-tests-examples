import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PIZZA_LIST, Pizza } from './pizza';

@Injectable({ providedIn: 'root' })
export class PizzaService {
  private readonly pizzas$$ = new BehaviorSubject<Pizza[]>(PIZZA_LIST);
  public readonly pizzas$ = this.pizzas$$.asObservable();
  private readonly cart$$ = new BehaviorSubject<Pizza[]>([]);
  public readonly cart$ = this.cart$$.asObservable();

  public addToCard(pizza: Pizza): void {
    const index = this.pizzas.findIndex(({ id }) => id === pizza.id);

    if (index === -1 || !pizza.isAvailable) {
      return;
    }

    this.cart$$.next([...this.cart, pizza]);
  }

  public removeFromCard(pizza: Pizza): void {
    this.cart$$.next([...this.cart.filter(({ id }) => id !== pizza.id)]);
  }

  private get cart(): Pizza[] {
    return this.cart$$.getValue();
  }

  private get pizzas(): Pizza[] {
    return this.pizzas$$.getValue();
  }
}
