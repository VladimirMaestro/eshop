import { Component, inject } from '@angular/core';
import { ProductService } from '@@app/products/services/product.service';
import { ProductFilters } from '@@app/products/store/models/products-filters';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  private productsService: ProductService = inject(ProductService);
  public queryString: string = '';

  applyQueryString(): void {
    const filters: Partial<ProductFilters> = { query: this.queryString };
    this.productsService.updateFilters$(filters).subscribe(() => {
      this.queryString = '';
    });
  }
}

