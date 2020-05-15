const { Router } = require("express");
const { getAllPosts, likePost, getPostById } = require("./post.controller");
const router = Router();

router.route("/").post(getAllPosts);
router.route("/:id").get(getPostById);
router.route("/like/:id").post(likePost);

module.exports = { router };
