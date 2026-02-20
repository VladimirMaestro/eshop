import { Component, inject, OnInit } from '@angular/core';
import { ProductsStoreFacade } from '@@app/products/store/products-store.facade';
import { Product } from '@@app/products/store/models/product';

@Component({
  standalone: false,
  selector: 'app-products-list',
  templateUrl: 'products-list.component.html',
  styleUrls: ['products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  private productsStoreFacade: ProductsStoreFacade = inject(ProductsStoreFacade);
  public products: Product[] = [];

  ngOnInit(): void {
    this.productsStoreFacade.products$.subscribe((products: Product[]) => {
      this.products = products;
    })
  }
}


