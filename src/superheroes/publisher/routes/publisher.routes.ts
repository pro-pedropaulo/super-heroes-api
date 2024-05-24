import { Router } from 'express';

import { PublisherController } from '../controller/PublisherController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const PublisherRouter = Router();
const publisherController = new PublisherController();

PublisherRouter.post(
  '/',
  isAuth,
  publisherController.create,
  /*  
    #swagger.tags = ['Publisher']
    #swagger.summary = 'Adds a new Publisher to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "publisher": "NewPublisher"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "publisher": "NewPublisher",
        "id": 30
      }
    }
  */
);

PublisherRouter.get(
  '/:id',
  isAuth,
  publisherController.findById,
  /*  
    #swagger.tags = ['Publisher']
    #swagger.summary = 'Fetches a Publisher by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Publisher ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 30,
        "publisher": "PublisherName"
      }
    }
  */
);

PublisherRouter.get(
  '/',
  isAuth,
  publisherController.getAll,
  /*  
    #swagger.tags = ['Publisher']
    #swagger.summary = 'Fetches all Publishers'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 30,
          "publisher": "PublisherName"
        }
      ]
    }
  */
);

PublisherRouter.put(
  '/:id',
  isAuth,
  publisherController.update,
  /*  
    #swagger.tags = ['Publisher']
    #swagger.summary = 'Updates an existing Publisher'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Publisher ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "publisher": "UpdatedPublisherName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Publisher updated successfully"
      }
    }
  */
);

PublisherRouter.delete(
  '/:id',
  isAuth,
  publisherController.delete,
  /*  
    #swagger.tags = ['Publisher']
    #swagger.summary = 'Deletes a Publisher by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Publisher ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Publisher deleted successfully"
      }
    }
  */
);

export { PublisherRouter };
