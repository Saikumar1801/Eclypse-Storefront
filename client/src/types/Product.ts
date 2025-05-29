export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  onSale?: boolean;
}
