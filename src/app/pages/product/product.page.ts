import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Comment } from '../../models/comment';
import { AppStore } from '../../store/app.store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CommentForm {
  fullName: FormControl<string | null>;
  comment: FormControl<string | null>;
}

@Component({
  standalone: false,
  templateUrl: 'product.page.html',
  styleUrl: 'product.page.scss'
})
export class ProductPage implements OnInit {
  private appStore: AppStore = inject(AppStore);
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
    this.appStore.getProductById$(this.productId).pipe(
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
    this.appStore.addProductComment(this.productId, comment);
  }
}
