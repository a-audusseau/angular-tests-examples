import { PizzaComponent } from './pizza/pizza.component';

export interface Pizza {
  readonly id: number;
  readonly name: string;
  readonly ingredients: string[];
  readonly cost: number;
  readonly isAvailable: boolean;
}

export const PIZZA_LIST: Pizza[] = [
  {
    id: 1,
    name: 'Margherita Magic',
    cost: 10,
    ingredients: ['Tomato', 'Mozzarella', 'Basil'],
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Pepperoni Paradise',
    cost: 12,
    ingredients: ['Tomato', 'Mozzarella', 'Pepperoni'],
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Veggie Delight',
    cost: 11,
    ingredients: ['Tomato', 'Mushroom', 'Eggplant'],
    isAvailable: true,
  },
  {
    id: 4,
    name: 'Mediterranean Marvel',
    cost: 12,
    ingredients: ['Tomato', 'Mozzarella', 'Eggplant'],
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
