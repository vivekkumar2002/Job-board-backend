import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger';
import { AppDataSource } from './config/database';
import jobRoutes from './routes/jobRoutes';

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
    res.json({ status: 'API is running' });
});

// Database connection and server start
AppDataSource.initialize()
    .then(() => {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on port ${port}`);
            console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
        });
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });