import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import collegeRoutes from './routes/colleges.js';
import cutoffRoutes from './routes/cutoffs.js';
import recommendationRoutes from './routes/recommendations.js';
import adminRoutes from './routes/admin.js';
import exportRoutes from './routes/export.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/cutoffs', cutoffRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/export', exportRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
