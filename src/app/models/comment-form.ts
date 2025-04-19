import { FormControl } from '@angular/forms';

export interface CommentForm {
  fullName: FormControl<string | null>;
  comment: FormControl<string | null>;
}
