const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser =require('../middleware/fetchuser');
const JWT_SECRET = 'Khushiisagoodgirl'
// ROUTE 1 : create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  // console.log(req.body);
  // const user = User(req.body);
  // user.save();

  //if there are errors, eeturn bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether the user with the same email xists aleady
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "sorry a user with this same email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt) 
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass ,
    });
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);

    // .then(user => res.json(user))
    // .catch(error=> {console.log(error)
    // res.json({error:'Please enter a unique email', message: error.message})});
    // res.json(user)
    res.json({authToken});
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
})

//  ROUTE 2 : Authenticate a user using: POST "/api/auth/login".
router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password can not be blank").exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({eror: 'Please ry to login with correct credential'})
    }

    const passwordCompare = await bcrypt.compare( password, user.password);
    if(!passwordCompare){
      return res.status(400).json({eror: 'Please ry to login with correct credential'})
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
})

//  ROUTE 3 : Get loged in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => {
try {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message)
    res.status(500).send("Internal Server Error");
}
})
module.exports = router;
