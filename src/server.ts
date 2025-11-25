import app from "./app";
import { CONFIG } from "./config";
import logger from "./config/logger";

const startServer = () => {
    try {
        const PORT = CONFIG.PORT;
        app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
        logger.info(`Listening on port : ${PORT}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startServer();
