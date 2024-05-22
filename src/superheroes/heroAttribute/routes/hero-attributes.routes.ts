import { Router } from 'express';

import { HeroAttributeController } from '../controller/HeroAttributeController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const HeroAttributeRouter = Router();
const heroAttributeController = new HeroAttributeController();

HeroAttributeRouter.post('/', isAuth, (req, res) =>
  heroAttributeController.create(req, res),
);
HeroAttributeRouter.get('/:id', isAuth, (req, res) =>
  heroAttributeController.findById(req, res),
);
HeroAttributeRouter.get('/', isAuth, (req, res) =>
  heroAttributeController.getAll(req, res),
);
HeroAttributeRouter.put('/:id', isAuth, (req, res) =>
  heroAttributeController.update(req, res),
);
HeroAttributeRouter.delete('/:id', isAuth, (req, res) =>
  heroAttributeController.delete(req, res),
);

export { HeroAttributeRouter };
