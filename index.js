const express = require("express");
const app = express();
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const { router: postRouter } = require("./resources/post/post.router");

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/post", postRouter);

app.listen("3000", function () {
  console.log("Server started on port 3000");
});
