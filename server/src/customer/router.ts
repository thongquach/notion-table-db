import express from 'express';

import { getCustomers } from './notion';

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  try {
    const customers = await getCustomers();
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default customerRouter;
