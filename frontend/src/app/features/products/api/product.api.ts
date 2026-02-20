import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@@env/environment';
import { ProductsPageRequest } from '@@app/models/products-page-request';
import { HttpUtils } from '@@app/utils/http.utils';
import { ProductDto } from '@@app/products/api/models/product.dto';
import { ProductsPageDto } from '@@app/products/api/models/products-page.dto';


@Injectable({ providedIn: "root" })
export class ProductApi {
  private http: HttpClient = inject(HttpClient);

  getAll$(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${environment.apiUrlPrefix}/products`);
  }

  getPage$(requestParams: ProductsPageRequest): Observable<ProductsPageDto> {
    const params: HttpParams = HttpUtils.createQueryParams(requestParams);
    return this.http.get<ProductsPageDto>(`${environment.apiUrlPrefix}/products`, { params });
  }
}
