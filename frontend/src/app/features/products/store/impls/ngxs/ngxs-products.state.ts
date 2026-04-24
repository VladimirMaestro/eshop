import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ProductFilters, ProductsPagination, ProductsState } from '@@app/products/store/models';
import { SetProductsPageNumber, UpdateProductFilters, UpdateProductPage } from '@@app/products/store/actions';

const INITIAL_STATE: ProductsState = {
  pagination: {
    items: [],
    page: 1,
    filters: {},
    limit: 12,
    totalPages: 0
  }
};

@State<ProductsState>({
  name: 'products_state',
  defaults: INITIAL_STATE
})
@Injectable()
export class NgxsProductsState {
  @Action(UpdateProductFilters)
  updateProductFilters(ctx: StateContext<ProductsState>, action: UpdateProductFilters) {
    const state = ctx.getState();
    const filters: ProductFilters = { ...state.pagination.filters, ...action.filters };
    ctx.patchState({ pagination: { ...state.pagination, filters } });
  }

  @Action(UpdateProductPage)
  updateProductPage(ctx: StateContext<ProductsState>, action: UpdateProductPage) {
    const state = ctx.getState();
    ctx.patchState({ pagination: { ...state.pagination, ...action.page } });
  }

  @Action(SetProductsPageNumber)
  setProductsPageNumber(ctx: StateContext<ProductsState>, action: SetProductsPageNumber) {
    const state = ctx.getState();
    ctx.patchState({ pagination: { ...state.pagination, page: action.pageNumber } });
  }
}
