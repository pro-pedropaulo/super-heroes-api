import { Router } from 'express';

import { ColourController } from '../controller/ColourController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const ColourRouter = Router();
const colourController = new ColourController();

ColourRouter.post(
  '/',
  isAuth,
  colourController.create,
  /*  
    #swagger.tags = ['Colour']
    #swagger.summary = 'Adds a new Colour to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "colour": "NewColour"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "colour": "NewColour",
        "id": 50
      }
    }
  */
);

ColourRouter.get(
  '/:id',
  isAuth,
  colourController.findById,
  /*  
    #swagger.tags = ['Colour']
    #swagger.summary = 'Fetches a Colour by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Colour ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 50,
        "colour": "ColourName"
      }
    }
  */
);

ColourRouter.get(
  '/',
  isAuth,
  colourController.getAll,
  /*  
    #swagger.tags = ['Colour']
    #swagger.summary = 'Fetches all Colours'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 50,
          "colour": "ColourName"
        }
      ]
    }
  */
);

ColourRouter.put(
  '/:id',
  isAuth,
  colourController.update,
  /*  
    #swagger.tags = ['Colour']
    #swagger.summary = 'Updates an existing Colour'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Colour ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "colour": "UpdatedColourName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Colour updated successfully"
      }
    }
  */
);

ColourRouter.delete(
  '/:id',
  isAuth,
  colourController.delete,
  /*  
    #swagger.tags = ['Colour']
    #swagger.summary = 'Deletes a Colour by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Colour ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Colour deleted successfully"
      }
    }
  */
);

export { ColourRouter };
