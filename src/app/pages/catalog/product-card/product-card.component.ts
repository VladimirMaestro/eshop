import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
}
