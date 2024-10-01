import express from 'express';
import { router } from '@/router/router';
import { logger } from '@/logger';
import { configDotenv } from "dotenv";
import cors from "cors"

configDotenv()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use((req, _, next) => {
  logger.info("New request received:", req.method, req.url);
  next();
});
app.use("/", router);


export { app }

