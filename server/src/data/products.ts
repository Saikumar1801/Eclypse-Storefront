export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  description: string;
  originalPrice?: number;
  onSale?: boolean;
}

export const dummyProducts: Product[] = [
  // Apparel
  {
    id: "1",
    name: "Classic Crew Neck Tee",
    category: "Apparel",
    price: 19.99,
    originalPrice: 29.99,
    onSale: true,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80", 
    rating: 4.5,
    reviewsCount: 120,
    description: "A comfortable and stylish classic crew neck t-shirt, perfect for everyday wear. Made from 100% premium cotton."
  },
  {
    id: "2",
    name: "Slim Fit Denim Jeans",
    category: "Apparel",
    price: 49.99,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b4?auto=format&fit=crop&w=400&q=80",
    rating: 4.2,
    reviewsCount: 98,
    description: "Trendy slim fit denim jeans made with durable fabric and comfortable stretch for everyday use."
  },
  {
    id: "3",
    name: "Hooded Sweatshirt",
    category: "Apparel",
    price: 39.99,
    originalPrice: 54.99,
    onSale: true,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviewsCount: 134,
    description: "Cozy hooded sweatshirt with adjustable drawstrings, perfect for chilly days and casual outings."
  },
  {
    id: "4",
    name: "Casual Sneakers",
    category: "Apparel",
    price: 59.99,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    reviewsCount: 180,
    description: "Lightweight casual sneakers designed for comfort and style on the go."
  },
  {
    id: "5",
    name: "Leather Jacket",
    category: "Apparel",
    price: 129.99,
    originalPrice: 159.99,
    onSale: true,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviewsCount: 67,
    description: "Premium genuine leather jacket with durable zippers and a stylish fit for all seasons."
  },

  // Electronics
  {
    id: "6",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1512499617640-c2f9992b2c61?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviewsCount: 250,
    description: "Experience immersive sound with these high-quality wireless Bluetooth headphones. Long battery life and comfortable fit."
  },
  {
    id: "7",
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 149.99,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1516728778615-2d590ea1856f?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviewsCount: 320,
    description: "Track your fitness goals and daily activity with this sleek smart fitness watch."
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    originalPrice: 79.99,
    onSale: true,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    reviewsCount: 215,
    description: "Compact portable speaker with crystal-clear sound and deep bass, perfect for outdoor use."
  },
  {
    id: "9",
    name: "4K Ultra HD Monitor",
    category: "Electronics",
    price: 299.99,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviewsCount: 110,
    description: "Stunning 27-inch 4K UHD monitor with vibrant colors and ultra-fast response time for gamers and creators."
  },
  {
    id: "10",
    name: "Wireless Ergonomic Mouse",
    category: "Electronics",
    price: 39.99,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    reviewsCount: 145,
    description: "Ergonomically designed wireless mouse that offers precision and comfort for long working hours."
  },
];
