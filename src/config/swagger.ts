import swaggerJsdoc from 'swagger-jsdoc';

const serverUrl = process.env.NODE_ENV === 'production' 
    ? 'https://job-board-backend-0wx0.onrender.com/api'
    : 'http://localhost:3000/api';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board API',
            version: '1.0.0',
            description: 'A simple Job Board API with CRUD operations',
        },
        servers: [
            {
                url: serverUrl,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            }
        ],
    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpecs = swaggerJsdoc(options); 