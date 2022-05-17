const Post = require("./models/Post");

module.exports.islogin = (req, res, next) => {
  if (!req.session.user_id) res.send("your not allowed to enter");
  next();
};

module.exports.isAuth = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post.user.equals(req.session.user_id))
      res.send("your are not alloewd");
    else next();
  } catch (err) {
    res.status(500).send(err);
  }
};
