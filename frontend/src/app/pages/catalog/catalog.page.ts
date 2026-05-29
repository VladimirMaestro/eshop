import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '@@app/products/services/product.service';
import { ProductFilterEntry } from '@@app/products/models/product-filter-entry';
import { ProductsStoreFacade } from '@@app/products/store/products-store.facade';
import { ProductsPagination } from '@@app/products/store/models/products-pagination';
import { ProductFilters } from '@@app/products/store/models/products-filters';
import { Product } from '@@app/products/store/models/product';

@Component({
  standalone: false,
  templateUrl: 'catalog.page.html',
  styleUrls: ['catalog.page.scss']
})
export class CatalogPage implements OnInit {
  private productService: ProductService = inject(ProductService);
  private productsStoreFacade: ProductsStoreFacade = inject(ProductsStoreFacade);

  public priceMin: undefined | number;
  public priceMax: undefined | number;
  public ratingMin: undefined | number;
  public products: Product[] = [];
  public currentPage: number = 0;
  public totalPages: number | null = null;
  public filterEntries: ProductFilterEntry[] = [];

  applyFilters(): void {
    const filters: Partial<ProductFilters> = {
      minPrice: this.priceMin || undefined,
      maxPrice: this.priceMax || undefined,
      minRating: this.ratingMin
    };
    this.productService.updateFilters$(filters).subscribe();
  }

  ngOnInit(): void {
    this.productService.fetchProductsPage$().subscribe();
    this.productsStoreFacade.pagination$.subscribe((pagination: ProductsPagination) => {
      this.products = pagination.items;
      this.currentPage = pagination.page;
      this.totalPages = pagination.totalPages;
      this.filterEntries = this.getFilterEntries();

      // Sync local input values with store filters
      this.priceMin = pagination.filters.minPrice as number;
      this.priceMax = pagination.filters.maxPrice as number;
      this.ratingMin = pagination.filters.minRating as number;
    });
  }

  removeFilter(filterEntry: ProductFilterEntry): void {
    const filters: Partial<ProductFilters> = {
      [filterEntry.key]: null
    };
    this.productsStoreFacade.updateProductFilters(filters);
  }

  onPageChange(pageNumber: number): void {
    this.productService.updatePageNumber$(pageNumber).subscribe();
  }

  private getFilterEntries(): ProductFilterEntry[] {
    const filterEntries: ProductFilterEntry[] = [];
    const pagination: ProductsPagination = this.productsStoreFacade.getProductsPagination();
    // TODO Create dedicated function for getting filters
    for (let [key, value] of Object.entries(pagination.filters)) {
      if (value != null && value !== '') {
        // key => 'maxPrice'
        filterEntries.push({ key, value });
      }
    }
    return filterEntries;
  }
}
