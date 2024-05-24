import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['src/shared/infra/http/app.ts'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'API',
    description: 'Documentation for the system endpoints ...',
  },
  schemes: ['http', 'https'],
  host: 'localhost:5555',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter Bearer + the token you have',
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Endpoints related to authentication',
    },
    {
      name: 'Users',
      description: 'Endpoints related to users',
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
