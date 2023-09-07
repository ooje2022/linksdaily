import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { DATABASE } from "./config";

import authRoutes from "./routes/auth";

const morgan = require("morgan");

const app = express();

// db connection
mongoose.set("strictQuery", false); // required for version 6
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//GENERAL MIDDLEWARE
/*app.use(express.json()); //handle json data in app
//app.use(cookieParser()); //for httpony user authentication cookie
app.use(express.urlencoded({ extended: false })); //handle data coming via the url
app.use(bodyParser.json()); //handle data from frontend to backend */
//===================== Routes ======================
/* app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

// route middlewares
app.use("/api", authRoutes);

app.listen(8000, () => console.log("Server running on port 8000......"));
