import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import { asyncWrapper } from "./common/utils/asyncWrapper";
import cookieParser from "cookie-parser";

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

// global error handler -> should be in last

app.use(globalErrorHandler);

export default app;
