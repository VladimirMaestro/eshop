import { ProductDto } from '@@app/products/api/models/product.dto';

export interface ProductsPageDto {
  items: ProductDto[];
  page: number;
  limit: number;
  totalPages: number;
}
