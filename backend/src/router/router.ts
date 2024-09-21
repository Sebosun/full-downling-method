import { create, login } from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: "Hello world" })
})

router.post('/login', login)
router.post('/user', create)

export { router }
