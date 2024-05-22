import { Router } from 'express';

import { ColourController } from '../controller/ColourController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const ColourRouter = Router();
const colourController = new ColourController();

ColourRouter.post('/', isAuth, (req, res) => colourController.create(req, res));

ColourRouter.get('/:id', isAuth, (req, res) =>
  colourController.findById(req, res),
);

ColourRouter.get('/', isAuth, (req, res) => colourController.getAll(req, res));

ColourRouter.put('/:id', isAuth, (req, res) =>
  colourController.update(req, res),
);

ColourRouter.delete('/:id', isAuth, (req, res) =>
  colourController.delete(req, res),
);

export { ColourRouter };
