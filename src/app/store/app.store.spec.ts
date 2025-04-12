import { AppStore } from './app.store';
import { Product } from '../models/product';
import { AppState } from '../models/app-state';
import { TestBed } from '@angular/core/testing';

describe('AppStore', () => {
  let store: AppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStore]
    });
    store = TestBed.inject(AppStore);
  })

  describe('getState', () => {
    it('should return initial state just after store initialization', function () {
      expect(store.getState()).toEqual({ products: [] });
    });
  });

  describe('getProductById', () => {
    it('should return product by id', function () {
      const expectedProduct: Product = { id: '123' } as Product;
      store.patchState({ products: [expectedProduct] });

      const resultProduct: Product = store.getProductById('123');

      expect(resultProduct).toEqual(expectedProduct);
    });
  });

  describe('patchState', () => {
    it('should patch state with provided state properties', function () {
      const product: Product = { id: '123' } as Product;
      const expectedState: AppState = { products: [product] };

      store.patchState(expectedState);

      expect(store.getState()).toEqual(expectedState);
    });
  });
});
