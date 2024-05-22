import { Router } from 'express';

import { AttributeController } from '../controller/AttributeController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const AttributeRouter = Router();
const attributeController = new AttributeController();

AttributeRouter.post('/', isAuth, (req, res) =>
  attributeController.create(req, res),
);

AttributeRouter.get('/:id', isAuth, (req, res) =>
  attributeController.findById(req, res),
);

AttributeRouter.get('/', isAuth, (req, res) =>
  attributeController.getAll(req, res),
);

AttributeRouter.put('/:id', isAuth, (req, res) =>
  attributeController.update(req, res),
);

AttributeRouter.delete('/:id', isAuth, (req, res) =>
  attributeController.delete(req, res),
);

export { AttributeRouter };
