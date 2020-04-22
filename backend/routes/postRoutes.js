const router = require("express").Router();
const Post = require("../models/postModel");

router.post("/", async (req, res) => {
  // retrieve the data from the req
  const { title, createdAt, tags, html } = req.body;

  // construct the post model
  const newPost = new Post({
    title, createdAt, tags, html
  });

  // save post model
  try {
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.end("finished req")
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;