import { Router } from 'express';

import { AuthenticationController } from '../controller/authenticationController';
import { isAuth } from '../../shared/infra/http/middlewares/IsAuth';

const AuthenticationRouter = Router();
const authenticationController = new AuthenticationController();

AuthenticationRouter.post('/', (req, res) =>
  authenticationController.login(req, res),
);

AuthenticationRouter.post('/logout', isAuth, (req, res) =>
  authenticationController.logout(req, res),
);

export { AuthenticationRouter };
