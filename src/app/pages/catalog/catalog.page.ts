import { Component, inject } from '@angular/core';
import { Product } from '../../models/product';
import { AppStore } from '../../store/app.store';
import { AppState } from '../../models/app-state';

@Component({
  standalone: false,
  templateUrl: 'catalog.page.html',
  styleUrls: ['catalog.page.scss']
})
export class CatalogPage {
  private appStore: AppStore = inject(AppStore);
  public products: Product[] = [];

  ngOnInit(): void {
    this.appStore.state$.subscribe((state: AppState) => {
      this.products = state.products
    })
  }

  removeDecimals(input: HTMLInputElement): void {
    input.value = input.value.replace(/\.|,|-/g, '');
  }
}
