import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../app.state';
export function localStorageMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    // Restore state from localStorage on app load or refresh
    if (action.type === INIT || action.type === UPDATE) {
      const savedState = localStorage.getItem('cartState');
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch {
          localStorage.removeItem('cartState');
        }
      }
    }

    const nextState = reducer(state, action);

    // Save updated state to localStorage
    localStorage.setItem('cartState', JSON.stringify(nextState));

    return nextState;
  };
}
