import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});