const Post = require("./post.model");

const getAllPosts = async (req, res) => {
  const body = req.body;
  try {
    const post = await Post.create(body);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { getAllPosts };
