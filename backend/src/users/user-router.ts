import express from "express";
import { UserService } from "./user-service";
import { UserController } from "./user-controller";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { validate } from "../common/utils/validate";
import { registerUserValidator } from "./user-validator";
const userRouter = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post(
    "/register",
    validate(registerUserValidator),
    asyncWrapper(userController.register),
);

userRouter.get("/", asyncWrapper(userController.getUsers));
// router.post("/login", login);
// router.post("/getProfile");

export default userRouter;
