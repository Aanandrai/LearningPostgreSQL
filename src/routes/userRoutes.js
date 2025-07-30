import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController.js"
import { validateUser, validateUserUpdate } from "../middlewares/inputValidater.js"
const router=express.Router()


router.route("/")
    .post(validateUser , createUser)
    .get(getAllUsers)

router.route("/:id")
    .get(getUserById)
    .put(validateUserUpdate ,updateUser)
    .delete(deleteUser)


export default router