import http from "node:http";
import path from "node:path";

import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";

import { router } from "./routes";

const PORT = 3001;

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect("mongodb://admin:admin@localhost:27017")
  .then(() => {
    app.use((_, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );

    app.use(express.json());
    app.use(router);

    server.listen(PORT, () =>
      console.log(`🚀 Server is running on http://localhost:${PORT}`),
    );
    console.log("Database connected");
  })
  .catch((err) => console.log("Error: ", { err }));
