import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import { asyncWrapper } from "./common/utils/asyncWrapper";

const app = express();

app.get(
    "/",
    asyncWrapper(async (req, res) => {
        res.send("hello world");
    }),
);

// global error handler -> should be in last

app.use(globalErrorHandler);

export default app;
