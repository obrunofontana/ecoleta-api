import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsCollectController {
  async index(req: Request, res: Response) {
    try {
      const items = await knex('itemscollect').select('*');
      if (!items) { return res.status(404).json({ message: 'Items not found' }); }
  
      const serializeItems = items.map((item) => {      
        return {
          id: item.id,
          title: item.title,
          imageUrl: `http://192.168.2.101:3001/uploads/${item.image}`
        };
      });
  
      return res.status(200).json(serializeItems);
    } catch (e) {
      return res.status(500).json({ error: e});
    }
  }
}

export default ItemsCollectController;
