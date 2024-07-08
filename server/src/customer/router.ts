import express from 'express';

import { getCustomers } from './notion';

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  try {
    const gridSortModel = (req.query.sortModel as string[] | undefined)?.map((item) => JSON.parse(item));
    const filtersString = req.query.filters as string | undefined;
    const filters = filtersString ? JSON.parse(filtersString) : undefined;

    const customers = await getCustomers(Array.isArray(gridSortModel) ? gridSortModel : undefined, filters);
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default customerRouter;
