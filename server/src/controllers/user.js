const User = require('../models/user')
require('dotenv').config();
const saltRounds = process.env.SALT_ROUND;

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
// register new user
const registerUser =async (req, res) => {
    try {
        // to check existing email
        const emailExists = await User.exists({email:req.body.email})
        if(emailExists)
        {
            return res.status(404).json({msg:'email already exist'})
        }
        // to encrypt password 
        req.body.password= bcrypt(req.body.password, saltRounds) 
        // create new users
        const newUser = await User.create(req.body);
        res.status(201).json({ msg: "User registered successfully", newUser });
    } catch (error) {
        res.status(500).json({ msg: 'Error registering user' });
    }
}
// login user credential
const loginUser = async (req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if(isMatched){
         const  token = jwt.sign({ email: req.body.email }, SECRET_KEY);
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