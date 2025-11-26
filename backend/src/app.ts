import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import { asyncWrapper } from "./common/utils/asyncWrapper";
import cookieParser from "cookie-parser";
import userRouter from "./users/user-router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(
    "/",
    asyncWrapper(async (req, res) => {
        res.send("hello world");
    }),
);

app.use("/users", userRouter);

// global error handler -> should be in last

app.use(globalErrorHandler);

export default app;
