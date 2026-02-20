import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductApi } from '@@app/products/api/product.api';
import { ProductsPageRequest } from '@@app/models/products-page-request';
import { ProductsStoreFacade } from '@@app/products/store/products-store.facade';
import { ProductFilters } from '@@app/products/store/models/products-filters';
import { ProductsPagination } from '@@app/products/store/models/products-pagination';
import { ProductsPageDto } from '@@app/products/api/models/products-page.dto';


@Injectable({ providedIn: "root" })
export class ProductService {
  private productsStoreFacade: ProductsStoreFacade = inject(ProductsStoreFacade);
  private productApi: ProductApi = inject(ProductApi);

  updateFilters$(filters: Partial<ProductFilters>): Observable<unknown> {
    this.productsStoreFacade.updateProductFilters(filters);
    return this.fetchProductsPage$();
  }

  updatePageNumber$(pageNumber: number): Observable<unknown> {
   // this.appStore.setProductsPageNumber(pageNumber);
    this.productsStoreFacade.setProductsPageNumber(pageNumber);
    return this.fetchProductsPage$();
  }

  updateSearchQuery$(query: string): Observable<unknown> {
    // this.appStore.setProductsSearchQuery(query);
    return this.fetchProductsPage$();
  }

  fetchProductsPage$(): Observable<unknown> {
    const pagination: ProductsPagination = this.productsStoreFacade.getProductsPagination();
    const pageRequest: ProductsPageRequest = {
      maxPrice: pagination.filters.maxPrice,
      minPrice: pagination.filters.minPrice,
      minRating: pagination.filters.minRating,
      query: pagination.filters.query,
      page: pagination.page,
      limit: pagination.limit
    };
    return this.productApi.getPage$(pageRequest).pipe(
      tap((pageDto: ProductsPageDto) => {
        // TODO Extract creating ProductsPagination object to mapper
        this.productsStoreFacade.updateProductsPage({
          items: pageDto.items,
          page: pageDto.page,
          limit: pageDto.limit,
          totalPages: pageDto.totalPages
        })
      })
    )
  }
}
