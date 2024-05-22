import { Router } from 'express';

import { SuperheroController } from '../controller/SuperheroController';
import { isAuth } from '../../../shared/infra/http/middlewares/IsAuth';

const SuperheroRouter = Router();
const superheroController = new SuperheroController();

SuperheroRouter.post('/', isAuth, superheroController.create);
SuperheroRouter.get('/:id', isAuth, superheroController.findById);
SuperheroRouter.get('/', isAuth, superheroController.getAll);
SuperheroRouter.put('/:id', isAuth, superheroController.update);
SuperheroRouter.delete('/:id', isAuth, superheroController.delete);
SuperheroRouter.post('/battle', isAuth, superheroController.createBattle);

export { SuperheroRouter };
