import { ProductFilters, ProductsPagination } from '@@app/products/store/models';
import { Action } from '@@app/sdk/store';

export class UpdateProductFilters implements Action {
  static readonly type: string = '[PRODUCTS] Update products filters';
  filters: Partial<ProductFilters>;

  constructor(filters: Partial<ProductFilters>) {
    this.filters = filters;
  }
}

export class UpdateProductPage implements Action {
  static readonly type: string = '[PRODUCTS] Update products page';
  readonly page: Partial<ProductsPagination>;

  constructor(page: Partial<ProductsPagination>) {
    this.page = page;
  }
}

export class SetProductsPageNumber implements Action {
  static readonly type: string = '[PRODUCTS] Set products page number';
  readonly pageNumber: number;

  constructor(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
}
