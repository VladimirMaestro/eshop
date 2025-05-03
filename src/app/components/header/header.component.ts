import { Component, inject } from '@angular/core';
import { AppStore } from '../../store/app.store';
import { ProductFilters } from '../../models/products-filters';
import { AppState } from '../../models/app-state';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  private appStore: AppStore = inject(AppStore);
  public queryString: string = '';
  public filtersBadges:[]=[];

  ngOnInit(): void {
    this.appStore.state$.subscribe((state: AppState) => {
    //  this.filtersBadges = state.productsSelectionCriteria.filters;

      // @ts-ignore
      this.filtersBadges = Object.keys(state.productsSelectionCriteria.filters)
      console.log("header",this.filtersBadges)
    })
  }

  applyQueryString(): void {
    const filters: Partial<ProductFilters> = {
      query: this.queryString
    };
    this.appStore.updateProductFilters(filters);
  }
}

