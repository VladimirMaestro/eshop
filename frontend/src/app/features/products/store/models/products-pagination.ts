import { Product } from '@@app/products/store/models/product';
import { ProductFilters } from '@@app/products/store/models/products-filters';

// TODO Consider other name to reflect Page not Pagination
export interface ProductsPagination {
  items: Product[];
  page: number;
  limit: number;
  totalPages: number;
  filters: ProductFilters;
}
