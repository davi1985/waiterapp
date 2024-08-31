import path from "node:path";

import express from "express";
import mongoose from "mongoose";

import { router } from "./routes";

const PORT = 3001;

mongoose
  .connect("mongodb://admin:admin@localhost:27017")
  .then(() => {
    const app = express();

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );

    app.use(express.json());
    app.use(router);

    app.listen(PORT, () =>
      console.log(`🚀 Server is running on http://localhost:${PORT}`),
    );
    console.log("Database connected");
  })
  .catch((err) => console.log("Error: ", { err }));
