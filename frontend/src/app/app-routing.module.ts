import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from '@@app/pages/catalog/catalog.page';
import { ProductPage } from '@@app/pages/product/product.page';
import { CartPage } from '@@app/features/cart/cart.page';

const routes: Routes = [
  { path: 'catalog', component: CatalogPage },
  { path: 'products/:id', component: ProductPage },
  { path: 'cart', component: CartPage },
  { path: '**', redirectTo: '/catalog', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
