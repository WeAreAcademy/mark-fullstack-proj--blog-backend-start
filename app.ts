import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const makeApp = (pool: Pool) => {
  const app = express();
  app.use(express.json()); //body parser
  app.use(cors())

  app.get("/", (req, res) => {
    res.json("Hello world!");
  });

  // Add your routes here
  // Note that you are inside the scope of a function, makeApp.


  return app;
};
