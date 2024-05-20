import mongoose from "mongoose";
import config from "./config";
import app from "./app";
import { Request, Response } from "express";

mongoose.set("strictQuery", false);
mongoose.connect(config.db_url as string)
    .then(() => {
app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`)
})
    })
    .catch((error) => {
        console.log(error)
    })