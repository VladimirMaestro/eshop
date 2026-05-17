import { Comment } from '@@app/models/comment';

export interface ProductDto {
  id?: string;
  name: string;
  description?: string;
  price: number;
  rating: number;
  image?: string;
  images?: string[];
  features?: string[];
  comments: Comment[];
}
