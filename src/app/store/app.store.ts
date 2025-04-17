import { AppState } from '../models/app-state';
import { Product } from '../models/product';
import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { Page } from '../models/page';

@Injectable()
export class AppStore {
  private state: AppState = {
    products: [
      {
        id: '1', name: 'First', price: 123.33, comments: [
          { text: 'Comment text 1', author: 'Michel Jackson', createdAt: '2025-03-15T21:01:37', likes: 3, dislikes: 35 } as Comment,
          { text: 'Comment text 2', author: 'Janet Jackson', createdAt: '2025-03-15T21:01:37' } as Comment,
          { text: 'Comment text 3', author: 'Ivan Jackson', createdAt: '2025-03-15T21:01:37' } as Comment
        ]
      } as Product,
      { id: '2', name: 'Second' } as Product,
      { id: '3', name: 'Third' } as Product,
      { id: '4', name: '4s' } as Product
    ],
    curentPage: Page.CATALOG
  };
  private stateSubject$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(this.state);
  public state$: Observable<any> = this.stateSubject$.asObservable();

  // GETTERS
  getState(): AppState {
    return this.state;
  }

  getProductById$(productId: string): Observable<Product | undefined> {
    return this.state$.pipe(map(() => this.getProductById(productId)));
  }

  // SETTERS
  patchState(state: Partial<AppState>): void {
    this.state = { ...this.state, ...state };
    this.stateSubject$.next(this.state);
  }

  addProduct(product: Product): void {
    this.state = { ...this.state, products: [...this.state.products, product] };
    this.stateSubject$.next(this.state);
  }

  updateProduct(productToUpdate: Product): void {
    const newProducts: Product[] = this.state.products.map((product: Product) => {
      return product.id === productToUpdate.id ? productToUpdate : product;
    })
    this.state = { ...this.state, products: newProducts };
    this.stateSubject$.next(this.state);
  }

  deleteProduct(productIdToDelete: string) {
    const newProducts: Product[] = this.state.products.filter((item: Product) => {
      return item.id !== productIdToDelete;
    })
    this.state = { ...this.state, products: newProducts };
    this.stateSubject$.next(this.state);
  }

  addProductComment(productId: string, newComment: Comment): void {
    const product: Product = this.getProductById(productId)!;
    const newProduct: Product = { ...product, comments: [...product.comments, newComment] };
    this.updateProduct(newProduct);
  }

  deleteProductComment(productId: string, commentIdToDelete: string): void {
    const product: Product = this.getProductById(productId)!;
    const newComments: Comment[] = product.comments.filter((item: Comment) => {
      return item.id !== commentIdToDelete;
    });
    const newProduct: Product = { ...product, comments: newComments };
    this.updateProduct(newProduct);
  }

  private getProductById(productId: string): Product | undefined {
    return this.state.products.find((product: Product) => {
      return product.id === productId;
    });
  }
  setCurrentPage(page: Page){
    this.state.curentPage=page;
  }
}
