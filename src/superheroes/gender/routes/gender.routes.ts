import { Router } from 'express';

import { GenderController } from '../controller/GenderController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const GenderRouter = Router();
const genderController = new GenderController();

GenderRouter.post('/', isAuth, (req, res) => genderController.create(req, res));

GenderRouter.get('/:id', isAuth, (req, res) =>
  genderController.findById(req, res),
);

GenderRouter.get('/', isAuth, (req, res) => genderController.getAll(req, res));

GenderRouter.put('/:id', isAuth, (req, res) =>
  genderController.update(req, res),
);

GenderRouter.delete('/:id', isAuth, (req, res) =>
  genderController.delete(req, res),
);

export { GenderRouter };
