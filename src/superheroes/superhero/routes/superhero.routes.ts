import { Router } from 'express';

import { SuperheroController } from '../controller/SuperheroController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const SuperheroRouter = Router();
const superheroController = new SuperheroController();

SuperheroRouter.post(
  '/',
  isAuth,
  superheroController.create,
  /*  
    #swagger.tags = ['Superhero']
    #swagger.summary = 'Adds a new Superhero to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "superheroName": "NewHeroName",
        "fullName": "NewHeroFullName",
        "heightCm": 100,
        "weightKg": 50,
        "gender": 1,
        "eyeColour": 1,
        "hairColour": 2,
        "skinColour": 3,
        "race": 1,
        "publisher": 1,
        "alignment": 1,
        "superpowers": [
          {
            "powerId": 1
          },
          {
            "powerId": 2
          }
        ]
      }
    }
    #swagger.responses[201] = {
      schema: {
        "superheroName": "NewHeroName",
        "fullName": "NewHeroFullName",
        "heightCm": 100,
        "weightKg": 50,
        "gender": {
          "id": 1,
          "gender": "Male"
        },
        "eyeColour": {
          "id": 1,
          "colour": "No Colour"
        },
        "hairColour": {
          "id": 2,
          "colour": "Amber"
        },
        "skinColour": {
          "id": 3,
          "colour": "Auburn"
        },
        "race": {
          "id": 1,
          "race": "-"
        },
        "publisher": {
          "id": 1,
          "publisher": ""
        },
        "alignment": {
          "id": 1,
          "alignment": "Good"
        },
        "superpowers": [
          {
            "id": 1,
            "powerName": "Agility"
          },
          {
            "id": 2,
            "powerName": "Accelerated Healing"
          }
        ],
        "id": 10
      }
    }
  */
);

SuperheroRouter.get(
  '/:id',
  isAuth,
  superheroController.findById,
  /*  
    #swagger.tags = ['Superhero']
    #swagger.summary = 'Fetches a Superhero by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Superhero ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 10,
        "superheroName": "NewHeroName",
        "fullName": "NewHeroFullName",
        "heightCm": 100,
        "weightKg": 50,
        "gender": {
          "id": 1,
          "gender": "Male"
        },
        "eyeColour": {
          "id": 1,
          "colour": "No Colour"
        },
        "hairColour": {
          "id": 2,
          "colour": "Amber"
        },
        "skinColour": {
          "id": 3,
          "colour": "Auburn"
        },
        "race": {
          "id": 1,
          "race": "-"
        },
        "publisher": {
          "id": 1,
          "publisher": ""
        },
        "alignment": {
          "id": 1,
          "alignment": "Good"
        },
        "heroAttributes": [
          {
            "id": 3740,
            "attributeValue": 30
          },
          {
            "id": 3741,
            "attributeValue": 50
          }
        ],
        "superpowers": [
          {
            "id": 1,
            "powerName": "Agility"
          },
          {
            "id": 2,
            "powerName": "Accelerated Healing"
          }
        ]
      }
    }
  */
);

SuperheroRouter.get(
  '/',
  isAuth,
  superheroController.getAll,
  /*  
    #swagger.tags = ['Superhero']
    #swagger.summary = 'Fetches all Superheroes'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['page'] = {
      in: 'query',
      type: 'number',
      description: 'Page number to access',
      required: false
    }
    #swagger.parameters['size'] = {
      in: 'query',
      type: 'number',
      description: 'Number of records to fetch',
      required: false
    }
    #swagger.parameters['attributeValue'] = {
      in: 'query',
      type: 'string',
      description: 'Order option for attributeValue - DESC or ASC',
      required: false
    }
    #swagger.parameters['powerId'] = {
      in: 'query',
      type: 'string',
      description: 'Order option for powerId - DESC or ASC',
      required: false
    }
    #swagger.parameters['attributeName'] = {
      in: 'query',
      type: 'string',
      description: 'Filter option for attributeName',
      required: false
    }
    #swagger.parameters['alignment'] = {
      in: 'query',
      type: 'string',
      description: 'Filter option for alignment',
      required: false
    }
    #swagger.parameters['powerName'] = {
      in: 'query',
      type: 'string',
      description: 'Filter option for powerName',
      required: false
    }
    #swagger.parameters['publisher'] = {
      in: 'query',
      type: 'string',
      description: 'Filter option for publisher',
      required: false
    }
    #swagger.responses[200] = {
      schema: {
        "currentPage": 1,
        "totalItems": 750,
        "totalPages": 750,
        "content": [
          {
            "id": 1,
            "superheroName": "3-D Man",
            "fullName": "Charles Chandler",
            "heightCm": 188,
            "weightKg": 90,
            "gender": {
              "id": 1,
              "gender": "Male"
            },
            "eyeColour": {
              "id": 9,
              "colour": "Brown"
            },
            "hairColour": {
              "id": 13,
              "colour": "Grey"
            },
            "skinColour": {
              "id": 1,
              "colour": "No Colour"
            },
            "race": {
              "id": 1,
              "race": "-"
            },
            "publisher": {
              "id": 13,
              "publisher": "Marvel Comics"
            },
            "alignment": {
              "id": 1,
              "alignment": "Good"
            },
            "heroAttributes": [
              {
                "id": 1,
                "attributeValue": 80,
                "attribute": {
                  "id": 1,
                  "attributeName": "Intelligence"
                }
              },
              {
                "id": 624,
                "attributeValue": 35,
                "attribute": {
                  "id": 2,
                  "attributeName": "Strength"
                }
              },
              {
                "id": 1247,
                "attributeValue": 45,
                "attribute": {
                  "id": 3,
                  "attributeName": "Speed"
                }
              },
              {
                "id": 1870,
                "attributeValue": 45,
                "attribute": {
                  "id": 4,
                  "attributeName": "Durability"
                }
              },
              {
                "id": 2493,
                "attributeValue": 45,
                "attribute": {
                  "id": 5,
                  "attributeName": "Power"
                }
              },
              {
                "id": 3116,
                "attributeValue": 45,
                "attribute": {
                  "id": 6,
                  "attributeName": "Combat"
                }
              }
            ],
            "superpowers": [
              {
                "id": 1,
                "powerName": "Agility"
              },
              {
                "id": 18,
                "powerName": "Super Strength"
              },
              {
                "id": 26,
                "powerName": "Stamina"
              },
              {
                "id": 31,
                "powerName": "Super Speed"
              }
            ]
          }
        ]
      }
    }
  */
);

SuperheroRouter.put(
  '/:id',
  isAuth,
  superheroController.update,
  /*  
    #swagger.tags = ['Superhero']
    #swagger.summary = 'Updates an existing Superhero'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Superhero ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "superheroName": "UpdatedHeroName",
        "fullName": "UpdatedHeroFullName",
        "heightCm": 100,
        "weightKg": 50,
        "gender": 1,
        "eyeColour": 1,
        "hairColour": 2,
        "skinColour": 3,
        "race": 1,
        "publisher": 1,
        "alignment": 1,
        "superpowers": [
          {
            "powerId": 1
          },
          {
            "powerId": 2
          }
        ]
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Superhero updated successfully"
      }
    }
  */
);

SuperheroRouter.delete(
  '/:id',
  isAuth,
  superheroController.delete,
  /*  
    #swagger.tags = ['Superhero']
    #swagger.summary = 'Deletes a Superhero by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Superhero ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Superhero deleted successfully"
      }
    }
  */
);

SuperheroRouter.post(
  '/battle',
  isAuth,
  superheroController.createBattle,
  /*  
    #swagger.tags = ['Superhero']
    #swagger.summary = 'Creates a battle between Superheroes according to the Publisher'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "publisherOne": 5,
        "publisherTwo": 6
      }
    }
    #swagger.responses[200] = {
      schema: [
        "Winner in attribute Combat was Birdman with a value of 70 | (Hanna-Barbera)",
        "Winner in attribute Durability was Birdman with a value of 70 | (Hanna-Barbera)",
        "Winner in attribute Intelligence was Yoda with a value of 95 | (George Lucas)",
        "Winner in attribute Power was Birdman with a value of 70 | (Hanna-Barbera)",
        "Winner in attribute Speed was Birdman with a value of 70 | (Hanna-Barbera)",
        "Winner in attribute Strength was Birdman with a value of 55 | (Hanna-Barbera)" 
      ]
    }
  */
);

export { SuperheroRouter };
