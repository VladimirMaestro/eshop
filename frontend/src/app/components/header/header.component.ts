import { Component, inject } from '@angular/core';
import { ProductService } from '@@app/products/services/product.service';
import { ProductFilters } from '@@app/products/store/models/products-filters';
import { Store } from '@ngxs/store';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  private productsService: ProductService = inject(ProductService);
  private store = inject(Store);
  public queryString: string = '';
  public cartCount: number = 0;

  ngOnInit():void{
   // this.cartCount = 7777;
    this.store.select(state => state.cart_state.items)
      .subscribe(items => {
        this.cartCount = items.length;
      });
  }

  applyQueryString(): void {
    const filters: Partial<ProductFilters> = { query: this.queryString };
    this.productsService.updateFilters$(filters).subscribe(() => {
      this.queryString = '';
    });
  }
}

