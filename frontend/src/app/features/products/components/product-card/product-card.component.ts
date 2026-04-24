import { Component, inject, Input } from '@angular/core';
import { Product } from '@@app/products/store/models/product';
import { CartItemProduct } from '@@app/features/cart/store/models/cart-state-model';
import { CartService } from '@@app/features/cart/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  private cartService: CartService = inject(CartService);

  addToCart(): void {
    const cartItemProduct: CartItemProduct = {
      id: this.product.id!,
      name: this.product.name,
      image: this.product.image,
      price: this.product.price
    }
    this.cartService.addProduct(cartItemProduct);
  }
}
