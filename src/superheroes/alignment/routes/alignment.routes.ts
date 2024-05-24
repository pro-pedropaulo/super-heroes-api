import { Router } from 'express';

import { AlignmentController } from '../controller/AlignmentController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const AlignmentRouter = Router();
const alignmentController = new AlignmentController();

AlignmentRouter.post(
  '/',
  isAuth,
  alignmentController.create,
  /*  
    #swagger.tags = ['Alignment']
    #swagger.summary = 'Add a new Alignment to the system'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "alignment": "AlignmentName"
      }
    }
    #swagger.responses[201] = {
      schema: {
        "alignment": "AlignmentName",
        "id": 1
      }
    }
  */
);

AlignmentRouter.get(
  '/:id',
  isAuth,
  alignmentController.findById,
  /*  
    #swagger.tags = ['Alignment']
    #swagger.summary = 'Fetch an Alignment by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Alignment ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        "id": 1,
        "alignment": "AlignmentName"
      }
    }
  */
);

AlignmentRouter.get(
  '/',
  isAuth,
  alignmentController.getAll,
  /*  
    #swagger.tags = ['Alignment']
    #swagger.summary = 'Fetch all Alignments'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      schema: [
        {
          "id": 1,
          "alignment": "AlignmentName"
        }
      ]
    }
  */
);

AlignmentRouter.put(
  '/:id',
  isAuth,
  alignmentController.update,
  /*  
    #swagger.tags = ['Alignment']
    #swagger.summary = 'Update an existing Alignment'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Alignment ID',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        "alignment": "UpdatedAlignmentName"
      }
    }
    #swagger.responses[200] = {
      schema: {
        message: "Alignment updated successfully"
      }
    }
  */
);

AlignmentRouter.delete(
  '/:id',
  isAuth,
  alignmentController.delete,
  /*  
    #swagger.tags = ['Alignment']
    #swagger.summary = 'Delete an Alignment by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'number',
      description: 'Alignment ID',
      required: true
    }
    #swagger.responses[200] = {
      schema: {
        message: "Alignment deleted successfully"
      }
    }
  */
);

export { AlignmentRouter };
