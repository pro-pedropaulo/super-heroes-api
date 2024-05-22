import { Router } from 'express';

import { PublisherController } from '../controller/PublisherController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const PublisherRouter = Router();
const publisherController = new PublisherController();

PublisherRouter.post('/', isAuth, (req, res) =>
  publisherController.create(req, res),
);
PublisherRouter.get('/:id', isAuth, (req, res) =>
  publisherController.findById(req, res),
);
PublisherRouter.get('/', isAuth, (req, res) =>
  publisherController.getAll(req, res),
);
PublisherRouter.put('/:id', isAuth, (req, res) =>
  publisherController.update(req, res),
);
PublisherRouter.delete('/:id', isAuth, (req, res) =>
  publisherController.delete(req, res),
);

export { PublisherRouter };
