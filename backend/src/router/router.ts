import { login } from "@/controllers/auth";
import { create, getAllUsers, getCurrentUser } from "@/controllers/user";
import { getExercise, getExercises } from "@/controllers/exercise";
import { isAuthenticatedMiddleware } from "@/middleware/isAuthenticated";
import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: "Hello world" })
})


router.post('/login', login)
router.post('/user', create)
router.get('/exercise/:id', getExercise)
router.get('/exercise/all', getExercises)
router.get('/user', isAuthenticatedMiddleware, getCurrentUser)
router.get('/user/all', isAuthenticatedMiddleware, getAllUsers)

export { router }
