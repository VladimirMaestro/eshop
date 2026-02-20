import { Component, Input } from '@angular/core';
import { Product } from '@@app/products/store/models/product';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
}
