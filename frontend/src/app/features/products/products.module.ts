import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '@@app/products/components/product-card/product-card.component';
import { ProductsListComponent } from '@@app/products/components/products-list/products-list.component';
import { CatalogPage } from '@@app/pages/catalog/catalog.page';
import { ProductPage } from '@@app/pages/product/product.page';
import { PaginationComponent } from '@@app/shared/components/pagination/pagination.component';
import { PRODUCTS_STORE } from '@@app/products/store/products-store.token';
import { CustomStoreAdapter } from '@@app/products/store/impls/custom/custom-store.adapter';

@NgModule({
  imports: [
    NgFor,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    RouterModule,
    NgSwitch,
    NgSwitchCase,
    PaginationComponent,
    NgIf
  ],
  declarations: [
    ProductCardComponent,
    ProductsListComponent,
    CatalogPage,
    ProductPage
  ],
  providers: [
    { provide: PRODUCTS_STORE, useClass: CustomStoreAdapter }
  ]
})
export class ProductsModule {}
