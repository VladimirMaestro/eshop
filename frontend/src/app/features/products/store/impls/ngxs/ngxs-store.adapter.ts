import { ProductsState } from '@@app/products/store/models';
import { Action, Store } from '@@app/sdk/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NgXsStoreAdapter implements Store<ProductsState> {
  dispatch(action: Action): void {
    console.log();
  }

  select<TValue>(selector: (s: ProductsState) => TValue): TValue {
    return null as TValue;
  }

  select$<TValue>(selector: (s: ProductsState) => TValue): Observable<TValue> {
    return of(null) as Observable<TValue>;
  }
}
