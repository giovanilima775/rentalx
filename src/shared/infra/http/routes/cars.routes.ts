import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateCarController } from '../../../../modules/cars/useCases/CreateCar/CreateCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticated);

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
