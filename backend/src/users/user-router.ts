import express from "express";
import { UserService } from "./user-service";
import { UserController } from "./user-controller";
import { asyncWrapper } from "../common/utils/asyncWrapper";
import { validate } from "../common/utils/validate";
import { loginUserValidator, registerUserValidator } from "./user-validator";
import logger from "../config/logger";
import {
    authenticateUser,
    authorize,
} from "../common/middlewares/authenticate";

const userRouter = express.Router();

const userService = new UserService();
const userController = new UserController(userService, logger);

userRouter.post(
    "/register",
    validate(registerUserValidator),
    asyncWrapper(userController.register),
);

userRouter.post(
    "/login",
    validate(loginUserValidator),
    asyncWrapper(userController.login),
);
userRouter.post("/logout", asyncWrapper(userController.logout));
userRouter.get("/", asyncWrapper(userController.getUsers));

userRouter.get(
    "/profile",
    authenticateUser,
    asyncWrapper(userController.getUserProfile),
);
userRouter.get(
    "/profile/:id",
    authenticateUser,
    authorize("ADMIN"),
    userController.getUserById,
);

export default userRouter;
