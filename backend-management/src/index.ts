// === File: backend/src/index.ts ===

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';
import softwareRoutes from './routes/software.routes';
import requestRoutes from './routes/request.routes';
import 'reflect-metadata';


const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('User Access Management API is running.');
  });
  
app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

AppDataSource.initialize().then(() => {
  app.listen(5000, () => console.log('Server started on port 5000'));
});