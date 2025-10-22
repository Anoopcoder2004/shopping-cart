import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.models';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ id: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ id: number; quantity: number }>()
);
