const express = require("express");
const { constants } = require("../constants");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const authRouter = express.Router();



authRouter.post('/register', async (req, res) =>{
  try {

   //? send the user info to the body
   const {name, email, password, username} = req.body;
   if(!name || !email || !password || !username){
    res.status(constants.UNAUTHORIZED);
   //  throw new err('Auth Failed');
   }
//? If user exists already
   const userExists = await User.findOne({email});
   if (userExists){
return res.status(constants.UNAUTHORIZED).json({message: "User already exists!"});
   }
//? password encryption
   const hashedPassword = await bcryptjs.hash(password, 8);
//? Create new user if there's not existing user
let user = new User({
      name,
      email,
      password: hashedPassword,
      username,
});
user = await user.save();
res.json(user); 

  } catch (err) {
   res.status(constants.SERVER_ERROR).json({err: err.message});
  
  }
});


authRouter.post('/login', async (req, res ) =>{
   try {
      const { email, password} = req.body;
      const user = await User.findOne({email});

      if (!user){
         return res.status(constants.UNAUTHORIZED).json({message: "User with this email does not exist"});
      }

      const correctPassword = await bcryptjs.compare(password, user.password);
      if (!correctPassword){
         return res.status(constants.UNAUTHORIZED).json({message: "Incorrect password"});
      }

      const token = jwt.sign({id: user._id}, "passwordKey");
      res.json({token, ...user._doc});
      
   } catch (err) {
      res.status(constants.SERVER_ERROR).json({err: err.message});
      
   }
});


authRouter.post("/tokenIsValid", async (req, res) => {
try {
   const token = req.header("x-auth-token");

    if(!token) return  res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if(!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if(!user) return res.jdon(false);

} catch (error) {
    res.status(constants.SERVER_ERROR).json({error: error.message});
}
});

//? Get user data
authRouter.get("/", auth, async (req, res) =>{
   const user = await User.findById(verified.id);
   res.json({...user._doc, token: req.token});
})

module.exports = authRouter;