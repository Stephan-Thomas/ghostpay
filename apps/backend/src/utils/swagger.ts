/**
 * API Documentation Setup
 * Swagger/OpenAPI configuration
 */

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// TODO: Complete Swagger documentation
// TODO: Add endpoint descriptions
// TODO: Add request/response schemas

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GhostPay API',
      version: '0.1.0',
      description: 'Privacy-focused payroll and salary wallet system built on Stellar blockchain',
      contact: {
        name: 'GhostPay Team',
        url: 'https://github.com/ghostpay/ghostpay',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://api.ghostpay.com/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { swaggerOptions: { url: '/swagger.json' } }));
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}
