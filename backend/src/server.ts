import express from 'express';
import { router } from '@/router/router';
import { logger } from '@/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((req, _, next) => {
  logger.info("New request received:", req.method, req.url);
  next();
});


export { app }

