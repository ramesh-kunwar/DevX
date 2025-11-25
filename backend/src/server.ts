import app from "./app";
import { CONFIG } from "./config";
import { initDb } from "./config/db";
import logger from "./config/logger";

const startServer = async () => {
    const PORT = CONFIG.PORT;
    try {
        await initDb();
        logger.info("Database Connected Successfully.");
        app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
        logger.info(`Listening on port : ${PORT}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startServer();
