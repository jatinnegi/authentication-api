import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/sequelize.js";
import routes from "./routes/index.js";
import { authMiddleware } from "./middlewares/index.js";

dotenv.config();
sequelize.sync().then(() => {
  console.log("Database running");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use("/api", routes);

app.listen(1337, () => {
  console.log("app is running");
});
