import { Router } from 'express';

import { AuthenticationController } from '../controller/authenticationController';
import { isAuth } from '../../shared/infra/http/middlewares/IsAuth';

const AuthenticationRouter = Router();
const authenticationController = new AuthenticationController();

AuthenticationRouter.post(
  '/',
  authenticationController.login,
  /*  #swagger.tags = ['Authentication']
      #swagger.summary = 'Logs in a user using email OR cpf'
      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginDTO'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Login successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                },
                user: {
                  type: 'object',
                  properties: {
                    cpf: {
                      type: 'string'
                    },
                    userId: {
                      type: 'string'
                    },
                    name: {
                      type: 'string'
                    },
                    email: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
  */
);

AuthenticationRouter.post(
  '/logout',
  isAuth,
  authenticationController.logout,
  /*  #swagger.tags = ['Authentication']
      #swagger.summary = 'Logs out a user and adds their token to the blacklist'
      #swagger.responses[200] = {
        description: 'Logout successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Logout successfully'
                }
              }
            }
          }
        }
      }
  */
);

export { AuthenticationRouter };
