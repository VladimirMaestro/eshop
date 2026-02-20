import { Comment } from '@@app/models/comment';

export interface ProductDto {
  id?: string;
  name: string;
  price: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  comments: Comment[];
}
