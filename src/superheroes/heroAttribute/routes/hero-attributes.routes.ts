import { Router } from 'express';

import { HeroAttributeController } from '../controller/HeroAttributeController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const HeroAttributeRouter = Router();
const heroAttributeController = new HeroAttributeController();

HeroAttributeRouter.post(
  '/',
  isAuth,
  heroAttributeController.create,
  /*  
    #swagger.tags = ['HeroAttribute']
    #swagger.summary = 'Adds a new HeroAttribute to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "attributeValue": 30,
        "superhero": 1,
        "attribute": 1
      }
    }
    #swagger.responses[201] = {
      schema: {
        "attributeValue": 30,
        "superhero": {
          "id": 1,
          "superheroName": "3-D Man",
          "fullName": "Charles Chandler",
          "heightCm": 188,
          "weightKg": 90
        },
        "attribute": {
          "id": 1,
          "attributeName": "Intelligence"
        },
        "id": 3739
      }
    }
  */
);

HeroAttributeRouter.get(
  '/:id',
  isAuth,
  heroAttributeController.findById,
  /*  
    #swagger.tags = ['HeroAttribute']
    #swagger.summary = 'Fetches a HeroAttribute by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'HeroAttribute ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 3739,
        "attributeValue": 30,
        "superhero": {
          "id": 1,
          "superheroName": "3-D Man",
          "fullName": "Charles Chandler",
          "heightCm": 188,
          "weightKg": 90
        },
        "attribute": {
          "id": 1,
          "attributeName": "Intelligence"
        }
      }
    }
  */
);

HeroAttributeRouter.get(
  '/',
  isAuth,
  heroAttributeController.getAll,
  /*  
    #swagger.tags = ['HeroAttribute']
    #swagger.summary = 'Fetches all HeroAttributes'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 3739,
          "attributeValue": 30,
          "superhero": {
            "id": 1,
            "superheroName": "3-D Man",
            "fullName": "Charles Chandler",
            "heightCm": 188,
            "weightKg": 90
          },
          "attribute": {
            "id": 1,
            "attributeName": "Intelligence"
          }
        }
      ]
    }
  */
);

HeroAttributeRouter.put(
  '/:id',
  isAuth,
  heroAttributeController.update,
  /*  
    #swagger.tags = ['HeroAttribute']
    #swagger.summary = 'Updates an existing HeroAttribute'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'HeroAttribute ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "attributeValue": 50,
        "superhero": 2,
        "attribute": 2
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "HeroAttribute updated successfully"
      }
    }
  */
);

HeroAttributeRouter.delete(
  '/:id',
  isAuth,
  heroAttributeController.delete,
  /*  
    #swagger.tags = ['HeroAttribute']
    #swagger.summary = 'Deletes a HeroAttribute by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'HeroAttribute ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "HeroAttribute deleted successfully"
      }
    }
  */
);

export { HeroAttributeRouter };
