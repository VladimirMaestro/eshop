import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ProductPage } from './pages/product/product.page';
import { AppStore } from './store/app.store';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './pages/catalog/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CatalogPage,
    ProductPage,
    HeaderComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppStore],
  bootstrap: [AppComponent]
})
export class AppModule {}
