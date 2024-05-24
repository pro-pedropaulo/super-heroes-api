import { Router } from 'express';

import { SuperpowerController } from '../controller/SuperpowerController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const SuperpowerRouter = Router();
const superpowerController = new SuperpowerController();

SuperpowerRouter.post(
  '/',
  isAuth,
  superpowerController.create,
  /*  
    #swagger.tags = ['Superpower']
    #swagger.summary = 'Adds a new Superpower to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "powerName": "NewPowerName"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "powerName": "NewPowerName",
        "id": 168
      }
    }
  */
);

SuperpowerRouter.get(
  '/:id',
  isAuth,
  superpowerController.findById,
  /*  
    #swagger.tags = ['Superpower']
    #swagger.summary = 'Fetches a Superpower by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Superpower ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 168,
        "powerName": "NewPowerName"
      }
    }
  */
);

SuperpowerRouter.get(
  '/',
  isAuth,
  superpowerController.getAll,
  /*  
    #swagger.tags = ['Superpower']
    #swagger.summary = 'Fetches all Superpowers'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 168,
          "powerName": "NewPowerName"
        }
      ]
    }
  */
);

SuperpowerRouter.put(
  '/:id',
  isAuth,
  superpowerController.update,
  /*  
    #swagger.tags = ['Superpower']
    #swagger.summary = 'Updates an existing Superpower'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Superpower ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "powerName": "UpdatedPowerName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Superpower updated successfully"
      }
    }
  */
);

SuperpowerRouter.delete(
  '/:id',
  isAuth,
  superpowerController.delete,
  /*  
    #swagger.tags = ['Superpower']
    #swagger.summary = 'Deletes a Superpower by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Superpower ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Superpower deleted successfully"
      }
    }
  */
);

export { SuperpowerRouter };
