import { Router } from 'express';

import { UsersController } from '../controller/UsersController';
import { upload } from '../../shared/container/providers/multer/multer';
import { isAuth } from '../../shared/infra/http/middlewares/IsAuth';

const UsersRouter = Router();
const usersController = new UsersController();

UsersRouter.post(
  '/',
  upload.single('profilePhoto'),
  usersController.createUser,
  /*  
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateUserDTO'
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'User created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' }
            }
          }
        }
      }
    }
  */
);

UsersRouter.get(
  '/:id',
  isAuth,
  usersController.findById,
  /*  
    #swagger.tags = ['Users']
    #swagger.summary = 'Get a user by ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID of the user'
    }
    #swagger.responses[200] = {
      description: 'User found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' }
            }
          }
        }
      }
    }
  */
);

UsersRouter.get(
  '/',
  isAuth,
  usersController.getAll,
  /*  
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'A list of users',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' }
              }
            }
          }
        }
      }
    }
  */
);

UsersRouter.put(
  '/:id',
  isAuth,
  upload.single('profilePhoto'),
  usersController.updateUser,
  /*  
    #swagger.tags = ['Users']
    #swagger.summary = 'Update a user'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID of the user'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UpdateUserDTO'
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'User updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }
  */
);

UsersRouter.delete(
  '/:id',
  isAuth,
  usersController.delete,
  /*  
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID of the user'
    }
    #swagger.responses[200] = {
      description: 'User deleted successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }
  */
);

UsersRouter.patch(
  '/:id/activate',
  isAuth,
  usersController.activeUser,
  /*  
    #swagger.tags = ['Users']
    #swagger.summary = 'Activate or deactivate a user'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      type: 'string',
      required: true,
      description: 'ID of the user'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ActiveUserDTO'
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Active status updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }
  */
);

export { UsersRouter };
