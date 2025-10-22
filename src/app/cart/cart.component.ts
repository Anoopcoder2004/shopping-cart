import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ needed for async pipe & ngFor
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from './cart.models';
import * as CartActions from './cart.actions';
import * as CartSelectors from './cart.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items$!: Observable<CartItem[]>;
  total$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.total$ = this.store.select(CartSelectors.selectTotalPrice);
  }

  addSampleItem() {
    const item: CartItem = { id: Math.random(), name: 'Sample Item', price: 100, quantity: 1 };
    this.store.dispatch(CartActions.addItem({ item }));
  }

  removeItem(id: number) {
    this.store.dispatch(CartActions.removeItem({ id }));
  }

  incrementQuantity(item: CartItem) {
    this.store.dispatch(CartActions.updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.store.dispatch(CartActions.updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      this.removeItem(item.id);
    }
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }
}
