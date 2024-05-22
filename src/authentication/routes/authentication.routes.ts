import { Router } from 'express';

import { AuthenticationController } from '../controller/authenticationController';

const AuthenticationRouter = Router();
const authenticationController = new AuthenticationController();

AuthenticationRouter.post('/', (req, res) =>
  authenticationController.login(req, res),
);

export { AuthenticationRouter };
