const express = require("express");
const app = express();
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connect = require("./utils/db");
const { router: postRouter } = require("./resources/post/post.router");
const { signup, signin } = require("./utils/auth");

app.disable("x-powered-by");
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/signup", signup);
app.use("/signin", signin);

app.use("/api/post", postRouter);

app.listen("3000", async function () {
  try {
    await connect();
    console.log("Server started on port 3000");
  } catch (error) {
    console.log(error);
  }
});
