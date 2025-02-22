import { create, login } from "@/controllers/auth";
import { getAllUsers, getCurrentUser } from "@/controllers/user";
import { getUserExercises, updateUserExercises, updateUserSettings } from "@/controllers/settings";
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

router.post('/exercise/answer', mayBeAuthenticatedMiddleware ,confirmAnswer)
router.get('/exercise/random', getRandomExercise)
router.get('/exercise/random/user', isAuthenticatedMiddleware, getRandomExerciseLoggedIn)
router.get('/exercise/all', getExercises)
router.get('/exercise/:id', getExercise)

router.get('/user', isAuthenticatedMiddleware, getCurrentUser)
router.get('/user/all', isAuthenticatedMiddleware, getAllUsers)
router.get('/user/exercises', isAuthenticatedMiddleware, getUserExercises)
router.patch('/user/exercises', isAuthenticatedMiddleware, updateUserExercises)
router.patch('/user/settings', isAuthenticatedMiddleware, updateUserSettings)

export { router }
