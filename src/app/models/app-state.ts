import { Product } from './product';
import { ProductsSelectionCriteria } from './selection-criteria';

export interface AppState {
  products: Product[];
  productsSelectionCriteria: ProductsSelectionCriteria;
}
