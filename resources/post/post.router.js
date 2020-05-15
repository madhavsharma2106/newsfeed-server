const { Router } = require("express");
const { getAllPosts } = require("./post.controller");
const router = Router();

router.route("/").post(getAllPosts);

module.exports = { router };
