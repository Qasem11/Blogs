const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.sign_up = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    // login after a successful register
    req.session.user_id = user._id;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.sign_in = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(400).send("Wrong entry");
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        req.session.user_id = user._id;
        //sending current URL to a client so he can go back from where he start login and then delete the url from the session
        let url = req.session.currentURL || "/post";
        delete req.session.currentURL;
        res.status(200).send(user);
      } else {
        res.send("Wrong entry");
      }
    } catch (err) {
      res.status(500).send("Wrong entry");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.sign_out = async (req, res) => {
  try {
    req.session.destroy();
    res.send("successfully logout");
  } catch (err) {
    res.status(500).json(err);
  }
};
