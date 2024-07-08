import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import express from 'express';

import { getCustomers } from './notion';

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  try {
    const sortModel = req.query.sortModel as QueryDatabaseParameters['sorts'] | undefined;
    const filters = req.query.filters as QueryDatabaseParameters['filter'] | undefined;

    const customers = await getCustomers(sortModel, filters);
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default customerRouter;
