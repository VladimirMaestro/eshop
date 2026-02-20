import { InjectionToken } from '@angular/core';
import { Store } from '@@app/sdk/store';
import { ProductsState } from '@@app/products/store/models';

export const PRODUCTS_STORE: InjectionToken<Store<ProductsState>> = new InjectionToken<Store<ProductsState>>('PRODUCTS_STORE');
