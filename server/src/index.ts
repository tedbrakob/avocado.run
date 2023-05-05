import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import spotify from "./routes/spotify"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use("/spotify", spotify);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});