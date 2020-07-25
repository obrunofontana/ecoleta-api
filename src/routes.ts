import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'ok'});
});

export default routes;
