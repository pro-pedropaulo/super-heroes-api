import { Router } from 'express';

import { UsersController } from '../controller/UsersController';
import { upload } from '../../shared/container/providers/multer/multer';
import { isAuth } from '../../shared/infra/http/middlewares/IsAuth';

const UsersRouter = Router();
const usersController = new UsersController();

UsersRouter.post('/', upload.single('profilePhoto'), (req, res) =>
  usersController.createUser(req, res),
);

UsersRouter.get('/:id', isAuth, (req, res) =>
  usersController.findById(req, res),
);

UsersRouter.get('/', isAuth, (req, res) => usersController.getAll(req, res));

UsersRouter.put('/:id', isAuth, upload.single('profilePhoto'), (req, res) =>
  usersController.updateUser(req, res),
);

UsersRouter.delete('/:id', isAuth, (req, res) =>
  usersController.delete(req, res),
);

UsersRouter.patch('/:id', isAuth, (req, res) =>
  usersController.activeUser(req, res),
);

export { UsersRouter };
