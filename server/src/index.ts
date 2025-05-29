import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Eclypse Backend Server is Running!');
});

// API Routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});