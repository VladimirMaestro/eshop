import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { CartItem, CartItemProduct, CartStateModel } from '@@app/features/cart/store/models/cart-state-model';
import { AddCartItem, RemoveCartItem, SetCartItemProductAmount } from '@@app/features/cart/store/actions';

const INITIAL_STATE: CartStateModel = {
  items: []
} as const;

@State<CartStateModel>({
  name: 'cart_state',
  defaults: INITIAL_STATE
})
@Injectable()
export class CartState {

  @Selector()
  static items(state: CartStateModel): CartItem[] {
    return state.items;
  }

  static cartItemByProductId(id: string): (state: CartStateModel) => CartItem | undefined {
    return createSelector(
      [CartState],
      (state: CartStateModel) => {
        return state.items.find((item: CartItem) => {
          return item.product.id === id;
        });
      }
    );
  }


  @Action(AddCartItem)
  addCartItem(ctx: StateContext<CartStateModel>, action: AddCartItem): void {
    const state: CartStateModel = ctx.getState();
    ctx.patchState({
      items: [ ...state.items, action.cartItem ]
    });
  }

  // @Action(AddCartItem)
  // addCartItem(ctx: StateContext<CartStateModel>, action: AddCartItem): void {
  //   const state: CartStateModel = ctx.getState();
  //
  //   const existingItem = state.items.find(
  //     item => item.id === action.cartItem.id
  //   );
  //
  //   if (existingItem) {
  //     ctx.patchState({
  //       items: state.items.map(item => {
  //         if (item.id === action.cartItem.id) {
  //           return {
  //             ...item,
  //             amount: item.amount + action.cartItem.amount
  //           };
  //         }
  //         return item;
  //       })
  //     });
  //   } else {
  //     ctx.patchState({
  //       items: [...state.items, action.cartItem]
  //     });
  //   }
  // }
  @Action(RemoveCartItem)
  removeCartItem(ctx: StateContext<CartStateModel>, action: RemoveCartItem): void {
    const state: CartStateModel = ctx.getState();
    ctx.patchState({
      items: state.items.filter((item: CartItem) => {
        return item.id !== action.cartItemId;
      })
    });
  }

  @Action(SetCartItemProductAmount)
  setCartItemProductAmount(ctx: StateContext<CartStateModel>, action: SetCartItemProductAmount): void {
    const state: CartStateModel = ctx.getState();
    ctx.patchState({
      items: state.items.map((item: CartItem) => {
        if (item.id === action.cartItemId) {
          return { ...item, amount: action.amount };
        }
        return item;
      })
    });
  }
}




