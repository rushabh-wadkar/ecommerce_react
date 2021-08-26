require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const router = require("./routes/app.router");
const mongoose = require("mongoose");

/** DB Connection */
const mongo = {
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  db: process.env.MONGO_DB,
  hostname: process.env.MONGO_HOSTNAME,
};
mongoose.connect(
  `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.hostname}/${mongo.db}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
app.use("/api", router);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

db.on(
  "error",
  console.error.bind(console, "connection error: Connection to DB Failed.")
);
db.once("open", function () {
  console.log("Connection to DB Successfull");
  app.listen(PORT, () => {
    console.log(`Yay! Server running on port: ${PORT}`);
  });
});
