const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const session = require("express-session");

const sessionOptions = {
  secret: "bla bla bla",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() * 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

app.use(session(sessionOptions));

// MiddleWares
app.use(express.static("./client/public"));
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", authRoute);
app.use("/post", postRoute);
// setting vriables for vlient to be used
app.use((req, res, next) => {
  res.locals.loginUser = req.session.user_id;
  // res.session.currentURL = req.originalUrl;
  next();
});
// connecting to dataBase
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => console.log("connecetion to DataBase succussfuly"))
  .catch((err) => console.log("error:", err));

// Routes

// no route found
app.use((req, res) => {
  res.status(404).send("NOT FOUND!!!");
});

// Listening
app.listen(PORT, () => {
  console.log(`Server is Running in port: ${PORT}`);
});
