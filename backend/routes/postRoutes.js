const router = require("express").Router();
const Post = require("../models/postModel");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  // retrieve the data from the req
  const { title, createdAt, tags, html, email } = req.body;

  // construct the post model
  const newPost = new Post({
    title, createdAt, tags, html, email
  });

  // save post model
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err);
  }
});

//put req
// router.put("/:id", (req, res) => {
//   Post.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, post) => {
//     if(err) return next(err);
//     res.send("Post updated.")
//   })
// })

router.patch("/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    // const savedPost = await Post.save();
    res.send("Post Updated!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete post
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    post.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});


module.exports = router;