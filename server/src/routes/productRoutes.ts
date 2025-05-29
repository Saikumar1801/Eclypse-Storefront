import express, { Request, Response } from 'express';
import { dummyProducts, Product } from '../data/products';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', (req: Request, res: Response) => {
  try {
    // Optional delay for testing loading states:
    // setTimeout(() => {
      res.json(dummyProducts);
    // }, 500);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET /api/products/:id - Get a single product by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const product = dummyProducts.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error fetching product with id ${req.params.id}:`, error);
    res.status(500).json({ message: "Error fetching product details" });
  }
});

// GET /api/products/category/:categoryName - Get products by category
router.get('/category/:categoryName', (req: Request, res: Response) => {
  try {
    const categoryName = req.params.categoryName.toLowerCase();
    const products = dummyProducts.filter(p => p.category.toLowerCase() === categoryName);
    res.json(products); // returns empty array if no match, which is good API design
  } catch (error) {
    console.error(`Error fetching products for category ${req.params.categoryName}:`, error);
    res.status(500).json({ message: "Error fetching products by category" });
  }
});

export default router;