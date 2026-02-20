import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';





export interface StoreCopy<TState> {
  select<TValue>(selector: (s: TState) => TValue): TValue;
  select$<TValue>(selector: (s: TState) => TValue): Observable<TValue>;
  patch(patch: Partial<TState>): void;
  reset(): void;
}

export abstract class FeatureStoreCopy<TState> implements StoreCopy<TState> {
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

  patch(patch: Partial<TState>): void {
    const state: TState = { ...this.state$.getValue(), ...patch };
    this.state$.next(state);
  }

  reset(): void {
    this.state$.next(this.initialState);
  };
}

interface Product {
  title: string;
}
interface ProductsState {
  products: Product[];
  pagination: {};
  data: [];
}

const INITIAL_STATE: ProductsState = {
  products: [],
  data: [],
  pagination: {}
};

class ProductsStore extends FeatureStoreCopy<ProductsState> {
  public products$: Observable<Product[]> = this.select$((s: ProductsState) => s.products);

  constructor() {
    super(INITIAL_STATE);
  }
}
