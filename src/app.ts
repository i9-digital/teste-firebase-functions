import "reflect-metadata";
import express from "express";
import router from "./router";
import swaggerDocs from "./swagger.json";
import swagger from "swagger-ui-express";
import errorHandler from "./middleware/error-handler";
import "./config/database/firebase";
import "./container";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(router);

app.use("/documentation", swagger.serve, swagger.setup(swaggerDocs));
app.use(errorHandler);

export default app;
