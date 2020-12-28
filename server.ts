import { makeApp } from "./app";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.USE_SSL ? {
    rejectUnauthorized: false //when connecting from laptop to heroku postgres.  
  } : false,
};
// A note on the ssl property:
//   In prod, ssl should be true.
//   When connecting a local server to local db, false
//   When connecting a local server to heroku db, value should be: { rejectUnauthorized: false }

const pool = new Pool(config);
pool.connect();

const app = makeApp(pool);

export default app;

app.listen(process.env.PORT, () => {
  console.log("Server is up and running!");
});
