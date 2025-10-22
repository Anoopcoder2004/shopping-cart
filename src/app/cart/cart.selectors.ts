import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.models';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCart,
  (state: CartState) => state.items
);

export const selectTotalPrice = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectTotalQuantity = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);
