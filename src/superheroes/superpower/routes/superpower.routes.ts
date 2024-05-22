import { Router } from 'express';

import { SuperpowerController } from '../controller/SuperpowerController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const SuperpowerRouter = Router();
const superpowerController = new SuperpowerController();

SuperpowerRouter.post('/', isAuth, (req, res) =>
  superpowerController.create(req, res),
);
SuperpowerRouter.get('/:id', isAuth, (req, res) =>
  superpowerController.findById(req, res),
);
SuperpowerRouter.get('/', isAuth, (req, res) =>
  superpowerController.getAll(req, res),
);
SuperpowerRouter.put('/:id', isAuth, (req, res) =>
  superpowerController.update(req, res),
);
SuperpowerRouter.delete('/:id', isAuth, (req, res) =>
  superpowerController.delete(req, res),
);

export { SuperpowerRouter };
