import cors from 'cors';
import express from 'express';

import customerRouter from './customer/router';

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use('/customer', customerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
