import { SwaggerDefinition, Options } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for your API',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      CreateSuperheroDTO: {
        type: 'object',
        properties: {
          superheroName: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
          heightCm: {
            type: 'number',
          },
          weightKg: {
            type: 'number',
          },
          gender: {
            type: 'number',
          },
          eyeColour: {
            type: 'number',
          },
          hairColour: {
            type: 'number',
          },
          skinColour: {
            type: 'number',
          },
          race: {
            type: 'number',
          },
          publisher: {
            type: 'number',
          },
          alignment: {
            type: 'number',
          },
          superpowers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                powerId: {
                  type: 'number',
                },
              },
            },
          },
        },
        required: [
          'superheroName',
          'fullName',
          'heightCm',
          'weightKg',
          'gender',
          'eyeColour',
          'hairColour',
          'skinColour',
          'race',
          'publisher',
          'alignment',
          'superpowers',
        ],
      },
      UpdateSuperheroDTO: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          superheroName: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
          heightCm: {
            type: 'number',
          },
          weightKg: {
            type: 'number',
          },
          gender: {
            type: 'number',
          },
          eyeColour: {
            type: 'number',
          },
          hairColour: {
            type: 'number',
          },
          skinColour: {
            type: 'number',
          },
          race: {
            type: 'number',
          },
          publisher: {
            type: 'number',
          },
          alignment: {
            type: 'number',
          },
          superpowers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                powerId: {
                  type: 'number',
                },
              },
            },
          },
        },
        required: [
          'id',
          'superheroName',
          'fullName',
          'heightCm',
          'weightKg',
          'gender',
          'eyeColour',
          'hairColour',
          'skinColour',
          'race',
          'publisher',
          'alignment',
          'superpowers',
        ],
      },
      Superhero: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          superheroName: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
          heightCm: {
            type: 'number',
          },
          weightKg: {
            type: 'number',
          },
          gender: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              gender: {
                type: 'string',
              },
            },
          },
          eyeColour: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              colour: {
                type: 'string',
              },
            },
          },
          hairColour: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              colour: {
                type: 'string',
              },
            },
          },
          skinColour: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              colour: {
                type: 'string',
              },
            },
          },
          race: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              race: {
                type: 'string',
              },
            },
          },
          publisher: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              publisher: {
                type: 'string',
              },
            },
          },
          alignment: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              alignment: {
                type: 'string',
              },
            },
          },
          superpowers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                },
                powerName: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};

const options: Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export default options;
