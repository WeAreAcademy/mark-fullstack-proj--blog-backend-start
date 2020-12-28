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


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
