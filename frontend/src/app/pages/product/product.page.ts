import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Comment } from '@@app/models/comment';
import { CommentForm } from '@@app/models/comment-form';
import { ProductsStoreFacade } from '@@app/products/store/products-store.facade';
import { Product } from '@@app/products/store/models/product';

@Component({
  standalone: false,
  templateUrl: 'product.page.html',
  styleUrl: 'product.page.scss'
})
export class ProductPage implements OnInit {
  private productsStoreFacade: ProductsStoreFacade = inject(ProductsStoreFacade);
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
      this.product = product;
    });
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
