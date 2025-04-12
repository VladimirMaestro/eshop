import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ProductPage } from './pages/product/product.page';
import { Page } from './models/page';

const routes: Routes = [
  { path: 'catalog', component: CatalogPage, data: { page: Page.CATALOG } },
  { path: 'products/:id', component: ProductPage, data: { page: Page.PRODUCT } },
  { path: '**', redirectTo: '/catalog', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
