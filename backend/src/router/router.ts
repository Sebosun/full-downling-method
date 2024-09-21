import { login } from "@/controllers/auth";
import { create, getAllUsers } from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: "Hello world" })
})

router.post('/login', login)
router.post('/user', create)
router.get('/user', getAllUsers)

export { router }
