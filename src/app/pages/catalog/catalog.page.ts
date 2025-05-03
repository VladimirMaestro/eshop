import { Component, inject } from '@angular/core';
import { Product } from '../../models/product';
import { AppStore } from '../../store/app.store';
import { AppState } from '../../models/app-state';
import { ProductFilters } from '../../models/products-filters';

interface PriceInputStatus {
  value: string,
  cursor: number
}
@Component({
  standalone: false,
  templateUrl: 'catalog.page.html',
  styleUrls: ['catalog.page.scss']
})
export class CatalogPage {
  private appStore: AppStore = inject(AppStore);
  public priceMin: string = '';
  public priceMax: string = '';
 // public ratingMin: string = '';
  public ratingMin: number = 1;
  private prevValues: { [key: string]: PriceInputStatus } = {};
  public products: Product[] = [];

  applyPriceMinMax(): void {
    const filters: Partial<ProductFilters> = {
      priceMin: Number(this.priceMin),
      priceMax: Number(this.priceMax),
      ratingMin: Number(this.ratingMin),
    };
    this.appStore.updateProductFilters(filters);
  }

  ngOnInit(): void {
    this.appStore.state$.subscribe((state: AppState) => {
      this.products = state.products
    })
  }

  onBeforeInput(key: string, input: HTMLInputElement): void {
    this.prevValues[key] = {
      value: input.value,
      cursor: input.selectionStart!
    };
  }

  onPriceRangeInput(key: string, input: HTMLInputElement): void {
    if (!input.value) return;
    if (!this.isInteger(input.value)) {
      const prev: PriceInputStatus = this.prevValues[key];
      input.value = prev.value;
      input.setSelectionRange(prev.cursor, prev.cursor);
    }
  }

  private isInteger(str: string): boolean {
    return /^(0|[1-9]\d*)$/.test(str);
  }
}


