const router = require("express").Router();
const User = require("../model/User");
var bcrypt = require('bcryptjs');

router.post('/register',async(req,res)=>{
    // checking user email id in database
  const emailExit = await User.findOne({
    email: req.body.email
  });
  if (emailExit) return res.status(203).json("Email already exists");
   // create new user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router;
