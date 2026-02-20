import { Action } from '@@app/sdk/store';
import { Product, ProductFilters, ProductsPagination } from '@@app/products/store/models';

export class SetProducts implements Action {
  readonly type: string = '[Products] set products';
  readonly products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }
}

export class UpdateProductFilters implements Action {
  readonly type: string = '[PRODUCTS] Update products filters';
  readonly filters: Partial<ProductFilters>;

  constructor(filters: Partial<ProductFilters>) {
    this.filters = filters;
  }
}

export class UpdateProductPage implements Action {
  readonly type: string = '[PRODUCTS] Update products page';
  readonly page: Partial<ProductsPagination>;

  constructor(page: Partial<ProductsPagination>) {
    this.page = page;
  }
}

const upp = new UpdateProductPage({});

export class SetProductsPageNumber implements Action {
  readonly type: string = '[PRODUCTS] Set products page number';
  readonly pageNumber: number;

  constructor(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
}
