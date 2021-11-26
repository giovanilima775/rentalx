import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { CreateCarController } from '../../../../modules/cars/useCases/CreateCar/CreateCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticated);

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRoutes };
