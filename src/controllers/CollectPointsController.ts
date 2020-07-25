import { Request, Response } from 'express';
import knex from '../database/connection';

class CollectPointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;
    try {
      const parsedItems = String(items).split(',').map(item => Number(item.trim()));

      const points = await knex('collectpoints')
        .join('itemsonpoints', 'collectpoints.id', 'itemsonpoints.collectPointId')
        .whereIn('itemsonpoints.itemCollectId', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('collectpoints.*');
      
      if(!points.length) { return res.status(404).json({ message: 'Nenhum registro encontrado.' }); }

      return res.status(200).json(points);
    } catch (e) {
      return res.status(500).json({ error: e});
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id }  = req.params;

      const point = await knex('collectpoints').where('id', id).first();
      if(!point) { return res.status(404).json({ message: 'Ponto de coleta não encontrado'}); }


      const items = await knex('itemscollect')
        .join('itemsonpoints', 'itemscollect.id', 'itemsonpoints.itemCollectId')
        .where('itemsonpoints.collectPointId', id)
        .select('itemscollect.title');

      point.items = items;

      return res.status(200).json(point);
    } catch (e) {
      return res.status(500).json({ error: e});
    } 
  }

  async create(req: Request, res: Response) {
    const { name, email, whatsapp, latitude, longitude, uf, city, items} = req.body;
    try {
      // Utiliza o transaction pois tenho duas transicoes, se a segunda falhar a primeira não é executada;
      const trx = await knex.transaction();

      // To-do: remover pela url upload
      const urlImg = 'https://images.unsplash.com/photo-1441123285228-1448e608f3d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60';
      const pointCollect = {name, email, whatsapp, latitude, longitude, uf, city, image: urlImg};
  
      const [collectPointId] = await trx('collectpoints')
        .insert(pointCollect);
  
      const pointItems = items.map((itemId : number) => {
        return {
          itemCollectId: itemId,
          collectPointId: collectPointId
        }
      });
  
      await trx('itemsonpoints').insert(pointItems);

      // Se tudo ocorrer susu belezinha, commita as transições;
      // Obs: Se der problema, o knex controlla o rollback, não precisando estar explicito;
      let teste  = await trx.commit();
  
      return res.status(200).json({ id: collectPointId , ...pointCollect});
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
}

export default CollectPointsController;
