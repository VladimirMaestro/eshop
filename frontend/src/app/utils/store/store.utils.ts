import { distinctUntilChanged, map, Observable } from 'rxjs';

export class StoreUtils {
  static selector$<T, S>(state$: Observable<S>, selectorFn: (state: S) => T): Observable<T> {
    return state$.pipe(
      map((state: S) => selectorFn(state)),
      distinctUntilChanged()
    );
  }
}
