import { NgModule } from '@angular/core';
import { CartPage } from '@@app/features/cart/cart.page';
import { NgxsModule } from '@ngxs/store';
import { CartState } from '@@app/features/cart/store/cart.state';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '@@app/features/cart/components/cart-item/cart-item.component';
import { CartResultComponent } from '@@app/features/cart/components/cart-result/cart-result.component';

@NgModule({
  imports: [
    NgxsModule.forFeature([CartState]),
    CommonModule
  ],
  declarations: [
    CartPage,
    CartItemComponent,
    CartResultComponent
  ],
  providers: []
})
export class CartModule {}
