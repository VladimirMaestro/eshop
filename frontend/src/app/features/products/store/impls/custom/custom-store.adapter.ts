import { ProductsPagination, ProductsState } from '@@app/products/store/models';
import { Action, Store } from '@@app/sdk/store';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ProductsStore } from '@@app/products/store/impls/custom/products.store';
import { SetProductsPageNumber, UpdateProductFilters, UpdateProductPage } from '@@app/products/store/actions';

@Injectable()
export class CustomStoreAdapter implements Store<ProductsState> {
  private store: ProductsStore = inject(ProductsStore);

  dispatch(action: Action): void {
    console.log('action', action);
    if (action instanceof UpdateProductPage) {
      const originalPage: ProductsPagination = this.store.getPagination();
      this.store.patch({
        pagination: { ...originalPage, ...action.page }
      });
      return;
    }
    if (action instanceof UpdateProductFilters) {
      this.store.updateProductFilters(action.filters);
      return;
    }
    if (action instanceof SetProductsPageNumber) {
      this.store.setProductsPageNumber(action.pageNumber);
      return;
    }
  }

  select<TValue>(selector: (s: ProductsState) => TValue): TValue {
    return selector(this.store.state);
  }

  select$<TValue>(selector: (s: ProductsState) => TValue): Observable<TValue> {
    return this.store.state$.pipe(
      map((state: ProductsState) => selector(state))
    );
  }
}
