import { Router } from 'express';

import { RaceController } from '../controller/RaceController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const RaceRouter = Router();
const raceController = new RaceController();

RaceRouter.post(
  '/',
  isAuth,
  raceController.create,
  /*  
    #swagger.tags = ['Race']
    #swagger.summary = 'Adds a new Race to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "race": "NewRace"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "race": "NewRace",
        "id": 100
      }
    }
  */
);

RaceRouter.get(
  '/:id',
  isAuth,
  raceController.findById,
  /*  
    #swagger.tags = ['Race']
    #swagger.summary = 'Fetches a Race by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Race ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 100,
        "race": "RaceName"
      }
    }
  */
);

RaceRouter.get(
  '/',
  isAuth,
  raceController.getAll,
  /*  
    #swagger.tags = ['Race']
    #swagger.summary = 'Fetches all Races'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 100,
          "race": "RaceName"
        }
      ]
    }
  */
);

RaceRouter.put(
  '/:id',
  isAuth,
  raceController.update,
  /*  
    #swagger.tags = ['Race']
    #swagger.summary = 'Updates an existing Race'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Race ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "race": "UpdatedRaceName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Race updated successfully"
      }
    }
  */
);

RaceRouter.delete(
  '/:id',
  isAuth,
  raceController.delete,
  /*  
    #swagger.tags = ['Race']
    #swagger.summary = 'Deletes a Race by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Race ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Race deleted successfully"
      }
    }
  */
);

export { RaceRouter };
