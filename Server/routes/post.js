const router = require("express").Router();
const { islogin, isAuth } = require("../middleware");
const controlpost = require("../controller/post");

router.route("/").get(controlpost.allPost).post(controlpost.newPost);

router
  .route("/:id")
  .get(controlpost.onePost)
  .put(controlpost.updatePost)
  .delete(controlpost.deletePost);

// post a review
router.post("/:id/review", controlpost.newReview);

module.exports = router;
