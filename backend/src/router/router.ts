import { login } from "@/controllers/auth";
import { create, getAllUsers, getCurrentUser, updateCurrentUser } from "@/controllers/user";
import { confirmAnswer, getExercise, getExercises, getRandomExercise } from "@/controllers/exercise";
import { isAuthenticatedMiddleware } from "@/middleware/isAuthenticated";
import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: "Hello world" })
})

router.post('/login', login)
router.post('/user', create)
router.patch('/user', isAuthenticatedMiddleware, updateCurrentUser)
router.post('/exercise/answer', confirmAnswer)
router.get('/exercise/random', getRandomExercise)
router.get('/exercise/all', getExercises)
router.get('/exercise/:id', getExercise)
router.get('/user', isAuthenticatedMiddleware, getCurrentUser)
router.get('/user/all', isAuthenticatedMiddleware, getAllUsers)

export { router }
