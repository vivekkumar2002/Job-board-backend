import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger';
import { AppDataSource } from './config/database';
import jobRoutes from './routes/jobRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Essential middleware
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/jobs', jobRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'API is running',
        databaseStatus: AppDataSource.isInitialized ? 'Connected' : 'Disconnected'
    });
});

// Start server first
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});

// Then try to connect to database
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error('Database connection error:', error);
        // Don't crash the server on DB connection error
    });

// Handle server shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        AppDataSource.destroy()
            .then(() => {
                console.log('Database connection closed');
                process.exit(0);
            });
    });
});