import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Comment } from '@@app/models/comment';
import { CommentForm } from '@@app/models/comment-form';
import { ProductsStoreFacade } from '@@app/products/store/products-store.facade';
import { Product } from '@@app/products/store/models/product';
import { CartService } from '@@app/features/cart/services/cart.service';
import { CartItemProduct } from '@@app/features/cart/store/models/cart-state-model';

@Component({
  standalone: false,
  templateUrl: 'product.page.html',
  styleUrl: 'product.page.scss'
})
export class ProductPage implements OnInit {
  private productsStoreFacade: ProductsStoreFacade = inject(ProductsStoreFacade);
  private cartService: CartService = inject(CartService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private productId: string = this.route.snapshot.paramMap.get('id')!;
  private destroyRef: DestroyRef = inject(DestroyRef);

  public product: Product | undefined;
  public form!: FormGroup<CommentForm>;
  public comment!: Comment | undefined;

  ngOnInit(): void {
    this.form = new FormGroup<CommentForm>({
      fullName: new FormControl<string | null>(null, [Validators.required]),
      comment: new FormControl<string | null>(null, [Validators.required]),
    });
    this.productsStoreFacade.getProductById$(this.productId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((product: Product | undefined) => {
      if (product) {
        // Mocking missing fields for demonstration as per the design request
        this.product = {
          ...product,
          images: product.images?.length ? product.images : [product.image || '', product.image || '', product.image || ''],
          features: product.features?.length ? product.features : [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Bluetooth 5.0',
            'Premium materials',
            'Foldable design',
            'Built-in microphone'
          ]
        };
      } else {
        this.product = undefined;
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;
    
    const cartItemProduct: CartItemProduct = {
      id: this.product.id!,
      name: this.product.name,
      image: this.product.image,
      price: this.product.price
    };
    this.cartService.addProduct(cartItemProduct);
  }

  addComment(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const comment: Comment = {
      text: this.form.value.comment!,
      author: this.form.value.fullName!,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0
    }
    // TODO create comments feature module
    //this.productsStoreFacade.addProductComment(this.productId, comment);
  }
}
