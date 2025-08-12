// Import npm modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";

// Import own modules
import authMiddleware from "./auth/middleware";
import * as errorMiddleware from "./error/middleware";
import projectController from "./project/controller";

// Init app

const app = express();

// Serve static files
app.use(express.static('public'));

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware); // Use Auth middleware for all following API routes

// Register routes and controller
app.use("/projects", projectController);

// Error handler
app.use(errorMiddleware.notFoundRoute);
app.use(errorMiddleware.errorHandler);

// Start server
const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.info(`LiveTime Server started and listening on http://localhost:${port}`);
});