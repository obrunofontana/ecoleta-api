import express from 'express';
import CollectPointsController from './controllers/CollectPointsController';
import ItemsCollectController from './controllers/ItemsCollectController';

const routes = express.Router();

// Inicia as instancias dos controllers
const collectPointsController = new CollectPointsController();
const itemsCollectController = new ItemsCollectController();

// Items Collect
routes.get('/itemscollect', itemsCollectController.index);

// Points Collect
routes.get('/collectPoints', collectPointsController.index);
routes.get('/collectPoints/:id', collectPointsController.show);
routes.post('/collectPoints', collectPointsController.create);

export default routes;
