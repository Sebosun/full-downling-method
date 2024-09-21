import { create } from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: "Hello world" })
})

router.post('/user', create)

export { router }
