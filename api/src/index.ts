import express from "express";
import mongoose from "mongoose";

const PORT = 3001;

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();

    app.listen(PORT, () =>
      console.log(`🚀 Server is running on http://localhost:${PORT}`),
    );
    console.log("Database connected");
  })
  .catch((err) => console.log("Error: ", { err }));
