import mongoose from "mongoose";
import config from "./config";
import app from "./app";


async function main() {
    try {
        await mongoose.connect(config.db_url as string); // assertion; because we know it
        // is a string well from typescript

        app.listen(config.port, () => {
            console.log(`app is listening on port ${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

main();