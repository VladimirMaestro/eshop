import { Observable } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, Subject } from 'rxjs';
import { Action } from '@@app/sdk/store/models/action';
import { inject, InjectionToken } from '@angular/core';

interface Product {
  title: string;
}

interface ProductsState {
  products: Product[];
  pagination: {};
  data: [];
}

const PRODUCTS_STORE: InjectionToken<Store<ProductsState>> = new InjectionToken<Store<ProductsState>>('PRODUCTS_STORE');

// PRODUCTS_STORE <==> NgXS ProductsStore <==> NgXS

export interface Store<TState> {
  select<TValue>(selector: (s: TState) => TValue): TValue;
  select$<TValue>(selector: (s: TState) => TValue): Observable<TValue>;
  dispatch(action: Action): void;
}

// Component => StoreFacade => Store<T> => NgXS<T> | NgRX<T> | CustomStore<T>



class ProductStoreFacade {
  private store: Store<ProductsState> = inject(PRODUCTS_STORE);

  getProductsBy(filters: object): Product[] {
    const selector = (state: ProductsState) => {
      // Filter products
      return state.products;
    };
    return this.store.select<Product[]>(selector);
  }

  setProducts(products: Product[]): void {
    const action = new SetProducts(products);
    this.store.dispatch(action);
  }
}

export abstract class FeatureStore<TState> implements Store<TState> {
  private initialState: TState;
  private state$: BehaviorSubject<TState>;

  protected constructor(initialState: TState) {
    this.initialState = initialState;
    this.state$ = new BehaviorSubject(initialState);
  }

  select<TValue>(): TValue {
    // TODO ...
    return {} as TValue;
  }

  select$<TValue>(selector: (s: TState) => TValue): Observable<TValue> {
    return this.state$.pipe(
      map((state: TState) => selector(state)),
      distinctUntilChanged()
    );
  }

  abstract dispatch(action: Action): void;
}








const INITIAL_STATE: ProductsState = {
  products: [],
  data: [],
  pagination: {}
};

class ProductsStore extends FeatureStore<ProductsState> {
  public products$: Observable<Product[]> = this.select$((s: ProductsState) => s.products);

  constructor() {
    super(INITIAL_STATE);
  }
}

const ps = new ProductsStore();
