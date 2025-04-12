import { Comment } from './comment';
export interface Product {
  id?: string;
  name: string;
  price: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  comments: Comment[];
}
