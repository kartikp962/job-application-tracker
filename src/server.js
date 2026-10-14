import { configDotenv } from "dotenv";
// import app from "./app.js";
// import pool from "./db/pg-pool.js";
configDotenv();
const app = (await import("./app.js")).default;
const pool = (await import("./db/pg-pool.js")).default;

const port = process.env.PORT;
app.listen(port, () => {
  const appName = process.env.APP_NAME;
  console.log(appName);
  console.log(`App running on port ${port}...`);
});
