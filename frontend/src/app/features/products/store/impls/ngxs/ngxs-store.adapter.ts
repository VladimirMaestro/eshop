import { ProductsState } from '@@app/products/store/models';
import { Action, Store } from '@@app/sdk/store';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Store as NgxsStore } from '@ngxs/store';

@Injectable()
export class NgXsStoreAdapter implements Store<ProductsState> {
  private ngxsStore: NgxsStore = inject(NgxsStore);

  dispatch(action: Action): void {
    this.ngxsStore.dispatch(action);
  }

  select<TValue>(selector: (s: ProductsState) => TValue): TValue {
    return this.ngxsStore.selectSnapshot((state) => {
      return selector(state.products_state);
    });
  }

  select$<TValue>(selector: (s: ProductsState) => TValue): Observable<TValue> {
    return this.ngxsStore.select((state) => {
      return selector(state.products_state);
    });
  }
}
