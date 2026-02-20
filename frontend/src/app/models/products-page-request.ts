export interface ProductsPageRequest {
  page?: number;
  limit?: number;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  query?: string;
}
