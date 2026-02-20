import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ProductsState } from '@@app/products/store/models/products-state';
import { Product } from '@@app/products/store/models/product';
import { ProductsPagination } from '@@app/products/store/models/products-pagination';
import { ProductFilters } from '@@app/products/store/models/products-filters';
import { StoreUtils } from '@@app/utils/store/store.utils';

const INITIAL_STATE: ProductsState = {
  pagination: {
    items: [],
    page: 1,
    filters: {},
    limit: 12,
    totalPages: 0
  }
};

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private static getPagination(state: ProductsState): ProductsPagination {
    return state.pagination;
  }

  private static getPaginationItems(state: ProductsState): Product[] {
    return ProductsStore.getPagination(state).items;
  }

  private static getFilters(state: ProductsState): ProductFilters {
    return ProductsStore.getPagination(state).filters;
  }

  private stateSubject$: BehaviorSubject<ProductsState> = new BehaviorSubject<ProductsState>(INITIAL_STATE);

  public state$: Observable<any> = this.stateSubject$.asObservable();
  public products$: Observable<Product[]> = StoreUtils.selector$(this.state$, ProductsStore.getPaginationItems);
  public pagination$: Observable<ProductsPagination> = StoreUtils.selector$(this.state$, ProductsStore.getPagination);

  get state(): ProductsState {
    return this.stateSubject$.getValue();
  }

  // GETTERS
  getPagination(): ProductsPagination {
    return ProductsStore.getPagination(this.state);
  }

  getProductsFilters(): ProductFilters {
    return ProductsStore.getFilters(this.state);
  }

  getProductById$(productId: string): Observable<Product | undefined> {
    return this.state$.pipe(map(() => this.getProductById(productId)));
  }

  // SETTERS
  patch(patch: Partial<ProductsState>): void {
    const state: ProductsState = { ...this.state, ...patch };
    this.stateSubject$.next(state);
  }

  setProductsPageNumber(page: number): void {
    const pagination: ProductsPagination = ProductsStore.getPagination(this.state);
    const state: ProductsState = {
      ...this.state,
      pagination: { ...pagination, page }
    };
    this.stateSubject$.next(state);
  }

  updateProductFilters(newFilters: Partial<ProductFilters>): void {
    const currentPagination: ProductsPagination = ProductsStore.getPagination(this.state);
    const currentFilters: ProductFilters = ProductsStore.getFilters(this.state);
    const filters: ProductFilters = { ...currentFilters, ...newFilters };
    const pagination: ProductsPagination = { ...currentPagination, filters };
    const state: ProductsState = { ...this.state, pagination };
    this.stateSubject$.next(state);
  }

  private getProductById(productId: string): Product | undefined {
    return this.state.pagination.items.find((product: Product) => {
      return product.id === productId;
    });
  }
}
