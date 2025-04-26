import { Component, inject } from '@angular/core';
import { AppStore } from '../../store/app.store';
import { ProductFilters } from '../../models/products-filters';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  private appStore: AppStore = inject(AppStore);
  public queryString: string = '';

  applyQueryString(): void {
    const filters: Partial<ProductFilters> = {
      query: this.queryString
    };
    this.appStore.updateProductFilters(filters);
  }
}

