import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.models';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { item }) => {
    const exists = state.items.find(i => i.id === item.id);
    if (exists) {
      return {
        ...state,
        items: state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      };
    }
    return { ...state, items: [...state.items, item] };
  }),
  on(CartActions.removeItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  })),
  on(CartActions.updateQuantity, (state, { id, quantity }) => ({
    ...state,
    items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),
  on(CartActions.clearCart, state => ({ ...state, items: [] }))
);
