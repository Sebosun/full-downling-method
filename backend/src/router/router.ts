import { login } from "@/controllers/auth";
import { create, getAllUsers, getCurrentUser } from "@/controllers/user";
import { getUserSettings, updateUserSettings } from "@/controllers/settings";
import { getExercise, getExercises, getRandomExercise, getRandomExerciseLoggedIn } from "@/controllers/exercise";
import { confirmAnswer } from "@/controllers/exercises/confirmAnswer";
import { isAuthenticatedMiddleware, mayBeAuthenticatedMiddleware } from "@/middleware/isAuthenticated";
import { Router } from "express";

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: "Hello world" })
})

router.post('/login', login)
router.post('/register', create)
router.get('/user/settings', isAuthenticatedMiddleware, getUserSettings)
router.patch('/user/settings', isAuthenticatedMiddleware, updateUserSettings)
router.get('/exercise/random/user', isAuthenticatedMiddleware, getRandomExerciseLoggedIn)
router.post('/exercise/answer', mayBeAuthenticatedMiddleware ,confirmAnswer)
router.get('/exercise/random', getRandomExercise)
router.get('/exercise/all', getExercises)
router.get('/exercise/:id', getExercise)
router.get('/user', isAuthenticatedMiddleware, getCurrentUser)
router.get('/user/all', isAuthenticatedMiddleware, getAllUsers)

export { router }
