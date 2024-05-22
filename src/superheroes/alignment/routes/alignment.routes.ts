import { Router } from 'express';

import { AlignmentController } from '../controller/AlignmentController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const AlignmentRouter = Router();
const alignmentController = new AlignmentController();

AlignmentRouter.post('/', isAuth, (req, res) =>
  alignmentController.create(req, res),
);

AlignmentRouter.get('/:id', isAuth, (req, res) =>
  alignmentController.findById(req, res),
);

AlignmentRouter.get('/', isAuth, (req, res) =>
  alignmentController.getAll(req, res),
);

AlignmentRouter.put('/:id', isAuth, (req, res) =>
  alignmentController.update(req, res),
);

AlignmentRouter.delete('/:id', isAuth, (req, res) =>
  alignmentController.delete(req, res),
);

export { AlignmentRouter };
