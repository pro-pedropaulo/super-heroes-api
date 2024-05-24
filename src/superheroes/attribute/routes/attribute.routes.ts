import { Router } from 'express';

import { AttributeController } from '../controller/AttributeController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const AttributeRouter = Router();
const attributeController = new AttributeController();

AttributeRouter.post(
  '/',
  isAuth,
  attributeController.create,
  /*  
    #swagger.tags = ['Attribute']
    #swagger.summary = 'Adds a new Attribute to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "attributeName": "NewAttribute"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "attributeName": "NewAttribute",
        "id": 10
      }
    }
  */
);

AttributeRouter.get(
  '/:id',
  isAuth,
  attributeController.findById,
  /*  
    #swagger.tags = ['Attribute']
    #swagger.summary = 'Fetches an Attribute by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Attribute ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 10,
        "attributeName": "attributeName"
      }
    }
  */
);

AttributeRouter.get(
  '/',
  isAuth,
  attributeController.getAll,
  /*  
    #swagger.tags = ['Attribute']
    #swagger.summary = 'Fetches all Attributes'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 1,
          "attributeName": "Intelligence"
        }
      ]
    }
  */
);

AttributeRouter.put(
  '/:id',
  isAuth,
  attributeController.update,
  /*  
    #swagger.tags = ['Attribute']
    #swagger.summary = 'Updates an existing Attribute'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Attribute ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "attributeName": "UpdatedAttributeName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Attribute updated successfully"
      }
    }
  */
);

AttributeRouter.delete(
  '/:id',
  isAuth,
  attributeController.delete,
  /*  
    #swagger.tags = ['Attribute']
    #swagger.summary = 'Deletes an Attribute by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Attribute ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Attribute deleted successfully"
      }
    }
  */
);

export { AttributeRouter };
