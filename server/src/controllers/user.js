const {Router} = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const saltRounds =10;

// get all users
const getAllUser = async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching users'});
    }
}
// get user by id
const getUserById =async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: 'User not found'});
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching user by ID'});
    }
}
//register new user
const registerUser = async (req, res) => {
    try {
      // Check if email or phone already exists
      const emailExists = await User.exists({ email: req.body.email });
      const phoneExists = await User.exists({ phoneNumber: req.body.phoneNumber });  
      if (emailExists || phoneExists) {
        return res.status(403).send({ msg: 'Email or Phone already taken' });
      }  
      // Encrypt password using bcrypt hash
      // Define salt rounds 
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    // Create new user document in the User collection
      await User.create(req.body);
      
      // Send success response
      res.status(201).json({ msg: "User created successfully" });
  
    } catch (error) {
      console.error('Error registering user:', error); 
      res.status(500).json({ msg: "Something went wrong" }); 
    }
  };   
// login user credential
const loginUser = async (req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if(isMatched){
         const  token = jwt.sign({ email: req.body.email }, 'shhhh');
         res.json({user,token,isLoggedIn: true})
        }else{
         res.json({msg: 'incorrect password'})
        }
    } catch (error) {
        res.status(500).json({ msg: 'something went worng'});
    }
}
// update user by id
const updateUserById = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: `${req.params.id} user updated successfully`, data });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating user'});
    }
}
// to delete user by id
const deleteUserById = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: `${req.params.id} User not found` });
        }
        res.json({ msg: `${req.params.id} user deleted successfully` });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting user'});
    }
}
// to export controller
module.exports ={getAllUser, getUserById, registerUser, loginUser,updateUserById, deleteUserById}