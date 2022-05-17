const User = require("../models/User");
const Post = require("../models/Post");
const Review = require("../models/Review");

//Displaying all posts
module.exports.allPost = async (req, res) => {
  let username = req.query.user;
  let posts;
  try {
    if (username) {
      try {
        const user = await User.findOne({ username: username });
        console.log(user);
        console.log(user._id);
        posts = await Post.find({ user: user._id }).populate();
      } catch (err) {
        res.status(500).send(err);
      }
    } else posts = await Post.find({}).populate("user");

    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.newPost = async (req, res) => {
  const request = req.body;
  const user = await User.findOne({ username: request.user });
  const newPost = new Post({
    title: request.title,
    description: request.description,
    image: request.image,
  });
  newPost.user = user._id;
  try {
    const post = await newPost.save();
    // let url = `/post/${post._id}`;
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports.onePost = async (req, res) => {
  console.log(req.params.id);
  const post = await Post.findById(req.params.id)
    .populate("reviewID")
    .populate({ path: "user", select: "-password" });
  try {
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send("Post Is Updated");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);

    res.status(200).send("Post Is Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.newReview = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const review = new Review(req.body);
    review.user = req.session.user_id;
    post.reviewID.push(review);
    await review.save();
    await post.save();
    res.status(200).send(review);
  } catch (err) {
    res.status(500).json(err);
  }
};
