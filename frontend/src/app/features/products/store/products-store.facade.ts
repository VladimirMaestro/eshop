import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@@app/products/store/models/product';
import { ProductFilters } from '@@app/products/store/models/products-filters';
import { ProductsPagination } from '@@app/products/store/models/products-pagination';
import { Store } from '@@app/sdk/store';
import { ProductsState } from '@@app/products/store/models';
import { PRODUCTS_STORE } from '@@app/products/store/products-store.token';
import { SetProductsPageNumber, UpdateProductFilters, UpdateProductPage } from '@@app/products/store/actions';

@Injectable({ providedIn: 'root' })
export class ProductsStoreFacade {
  private store: Store<ProductsState> = inject(PRODUCTS_STORE);
  public products$: Observable<Product[]> = this.store.select$<Product[]>((state: ProductsState) => {
    return state.pagination.items;
  });

  public pagination$: Observable<ProductsPagination> = this.store.select$<ProductsPagination>((state: ProductsState) => {
    return state.pagination;
  });

  updateProductFilters(filters: Partial<ProductFilters>): void {
    return this.store.dispatch(new UpdateProductFilters(filters));
  }

  updateProductsPage(page: Partial<ProductsPagination>): void {
    return this.store.dispatch(new UpdateProductPage(page));
  }

  setProductsPageNumber(pageNumber: number): void {
    return this.store.dispatch(new SetProductsPageNumber(pageNumber));
  }

  getProductsFilters(): ProductFilters {
    return this.store.select<ProductFilters>((state: ProductsState) => {
      return state.pagination.filters;
    });
  }

  getProductsPagination(): ProductsPagination {
    const selector = (state: ProductsState) => {
      return state.pagination;
    };
    return this.store.select<ProductsPagination>(selector);
  }

  getProductById$(productId: string): Observable<Product | undefined> {
    return this.store.select$<Product | undefined>((state: ProductsState) => {
      return state.pagination.items.find((product: Product) => String(product.id) === productId);
    });
  }
}
