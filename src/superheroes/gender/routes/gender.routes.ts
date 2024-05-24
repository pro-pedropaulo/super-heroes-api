import { Router } from 'express';

import { GenderController } from '../controller/GenderController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const GenderRouter = Router();
const genderController = new GenderController();

GenderRouter.post(
  '/',
  isAuth,
  genderController.create,
  /*  
    #swagger.tags = ['Gender']
    #swagger.summary = 'Adds a new Gender to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "gender": "NewGender"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "gender": "NewGender",
        "id": 10
      }
    }
  */
);

GenderRouter.get(
  '/:id',
  isAuth,
  genderController.findById,
  /*  
    #swagger.tags = ['Gender']
    #swagger.summary = 'Fetches a Gender by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Gender ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 10,
        "gender": "GenderName"
      }
    }
  */
);

GenderRouter.get(
  '/',
  isAuth,
  genderController.getAll,
  /*  
    #swagger.tags = ['Gender']
    #swagger.summary = 'Fetches all Genders'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 10,
          "gender": "GenderName"
        }
      ]
    }
  */
);

GenderRouter.put(
  '/:id',
  isAuth,
  genderController.update,
  /*  
    #swagger.tags = ['Gender']
    #swagger.summary = 'Updates an existing Gender'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Gender ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "gender": "UpdatedGenderName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Gender updated successfully"
      }
    }
  */
);

GenderRouter.delete(
  '/:id',
  isAuth,
  genderController.delete,
  /*  
    #swagger.tags = ['Gender']
    #swagger.summary = 'Deletes a Gender by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Gender ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Gender deleted successfully"
      }
    }
  */
);

export { GenderRouter };
