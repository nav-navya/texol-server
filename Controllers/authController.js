import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

 export const register = async (req,res)=>{
  try{
    const {fullName ,email, password,role,phone} = req.body;

    let user = await User.findOne({email});
    if(user)
      return res.status(400).json({msg:"User already exists"})


      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);


      //create and save user
      user = new User({fullName, email, password:hashedPassword,role,phone})
      await user.save();

      res.status(201).json({ msg: "User registered successfully" });
    }
  
  catch(error){
    res.status(500).json({msg:"Server error", "error":error.message})

  }

}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "No user found with this email." }); // 404 - not found
    }

    // Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" }); // 400 - bad request
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send success response with the token
    res.status(200).json({
      msg: "User logged in successfully",
      token, // Return the token so the user can use it for future requests
    });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ msg: "An error occurred. Please try again." }); // 500 - internal server error
  }
};
