// src/app/products/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/cart.actions';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Products</h2>
    <div *ngFor="let product of products">
      <p>{{product.name}} - {{product.price}}</p>
      <button (click)="addToCart(product)">Add to Cart</button>
    </div>
  `
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Headphones', price: 1500 },
    { id: 3, name: 'Keyboard', price: 1200 },
    { id: 4, name: 'Mouse', price: 800 }
  ];

  constructor(private store: Store) {}

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addItem({ item: { ...product, quantity: 1 } }));
  }
}
