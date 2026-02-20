import { BehaviorSubject, distinctUntilChanged, map, Observable, of, Subject } from 'rxjs';
import { Action } from '@@app/sdk/store/models/action';
import { inject, InjectionToken } from '@angular/core';

// const STORE: InjectionToken<Store> = new InjectionToken<Store>('STORE');

export interface Store<TState> {
  select<TValue>(selector: (s: TState) => TValue): TValue;
  select$<TValue>(selector: (s: TState) => TValue): Observable<TValue>;
  dispatch(action: Action): void;
}



// export abstract class FeatureStore<TState> implements Store<TState> {
//   private initialState: TState;
//   private state$: BehaviorSubject<TState>;
//
//   protected constructor(initialState: TState) {
//     this.initialState = initialState;
//     this.state$ = new BehaviorSubject(initialState);
//   }
//
//   select<TValue>(): TValue {
//     // TODO ...
//     return {} as TValue;
//   }
//
//   select$<TValue>(selector: (s: TState) => TValue): Observable<TValue> {
//     return this.state$.pipe(
//       map((state: TState) => selector(state)),
//       distinctUntilChanged()
//     );
//   }
//
//   patch(patch: Partial<TState>): void {
//     const state: TState = { ...this.state$.getValue(), ...patch };
//     this.state$.next(state);
//   }
//
//   reset(): void {
//     this.state$.next(this.initialState);
//   };
// }


