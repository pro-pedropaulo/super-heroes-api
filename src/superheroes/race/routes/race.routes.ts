import { Router } from 'express';

import { RaceController } from '../controller/RaceController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const RaceRouter = Router();
const raceController = new RaceController();

RaceRouter.post('/', isAuth, (req, res) => raceController.create(req, res));

RaceRouter.get('/:id', isAuth, (req, res) => raceController.findById(req, res));

RaceRouter.get('/', isAuth, (req, res) => raceController.getAll(req, res));

RaceRouter.put('/:id', isAuth, (req, res) => raceController.update(req, res));

RaceRouter.delete('/:id', isAuth, (req, res) =>
  raceController.delete(req, res),
);

export { RaceRouter };
