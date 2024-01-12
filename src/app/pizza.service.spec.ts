import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { PizzaService } from './pizza.service';
import { Pizza } from './pizza';
import { firstValueFrom } from 'rxjs';

describe('PizzaService', () => {
  let spectator: SpectatorService<PizzaService>;

  const pizza: Pizza = {
    id: 2,
    name: 'Pepperoni Paradise',
    cost: 12,
    ingredients: ['Tomato', 'Mozzarella', 'Pepperoni'],
    isAvailable: true,
  };

  const createService = createServiceFactory(PizzaService);

  beforeEach(() => (spectator = createService()));

  describe('The addToCard method', () => {
    describe('when the pizza is not in the pizza list', () => {
      it('should not add it to the cart', async () => {
        spectator.service.addToCard({ ...pizza, id: -1 });
        expect(await firstValueFrom(spectator.service.cart$)).toHaveLength(0);
      });
    });

    describe('when the pizza is not in available', () => {
      it('should not add it to the cart', async () => {
        spectator.service.addToCard({ ...pizza, isAvailable: false });
        expect(await firstValueFrom(spectator.service.cart$)).toHaveLength(0);
      });
    });

    describe('otherwise', () => {
      it('should add the pizza to the cart', async () => {
        spectator.service.addToCard(pizza);
        expect(await firstValueFrom(spectator.service.cart$)).toContain(pizza);
      });
    });
  });

  describe('The removeFromCard method', () => {
    beforeEach(() => spectator.service.addToCard(pizza));

    it('should remove the pizza from the card', async () => {
      expect(await firstValueFrom(spectator.service.cart$)).toContain(pizza);
      spectator.service.removeFromCard(pizza);
      expect(await firstValueFrom(spectator.service.cart$)).not.toContain(
        pizza
      );
    });
  });
});
