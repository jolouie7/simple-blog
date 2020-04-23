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
  const { title, createdAt, tags, html } = req.body;

  // construct the post model
  const newPost = new Post({
    title, createdAt, tags, html
  });

  // save post model
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err);
  }
});

//patch req
router.patch("/:id", (req, res) => {
  const post = {
    title: req.body.title,
    createdAt: Date.now(),
    tags: req.body.tags,
    html: req.body.html
  }
  Post.findByIdAndUpdate({_id: req.params.id}, post, {useFindAndModify: false}, (err, post) => {
    if(err) {
      console.error(err)
      res.json({
        error: err
      })
    }
    res.json(post)
  })
})

//put req
// router.put("/:id", (req, res) => {
//   Post.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, post) => {
//     if(err) return next(err);
//     res.send("Post updated.")
//   })
// })

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