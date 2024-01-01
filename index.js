//import statements
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

//dotenv configuration declaration
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//app initialization
const app = express();

//json parser middleware
app.use(express.json());

//cors middleware
app.use(cors());

//express router middleware
app.use("/books", booksRoute);

//Home route
app.get("/", (req, res) => {
  res.status(606).send("Books App is running...");
});

//mongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
