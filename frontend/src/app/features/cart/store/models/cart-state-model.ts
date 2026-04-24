
export interface CartItemProduct {
  id: string;
  image?: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: CartItemProduct;
  amount: number;
}

export interface CartStateModel {
  items: CartItem[];
}
