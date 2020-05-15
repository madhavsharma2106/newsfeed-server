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

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.update({ _id: id }, { $inc: { likes: +1 } }).exec();
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllPosts, likePost, getPostById };
