const express = require('express')
const cookieParser = require('cookie-parser')
require('../googleoauth/passport.js')
const passport = require('passport');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = express.Router()
const User = require('../models/User')
const userAuthCheck = require('../middleware/userAuthCheck')
require('dotenv').config()
const url = process.env.FRONTEND_URL
auth.use(cookieParser())

auth.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

auth.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
      const accessToken = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      const refreshToken = jwt.sign({ _id: req.user._id }, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET, { expiresIn: '7d' });

      const cookieOptions = {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
         path: '/',
      };
      res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
      res.redirect(`${url}/home`);
  }
);

auth.post('/login' , async (req , res) => {
   const { email , password } = req.body
   if (!email || !password) {
      return res.status(400).send(`email or password is missing`)
   }
   try{
      const ourUserArr = await User.find({ email })
      if (ourUserArr.length === 0) return res.status(404).send(`Such user does not exist`)
      const isPassword = await bcrypt.compare(password , ourUserArr[0].password)
      if (isPassword) {
            // create tokens
            const accessToken = jwt.sign({ _id: ourUserArr[0]._id } , process.env.JWT_SECRET , {expiresIn : '15m'})
            const refreshToken = jwt.sign({ _id: ourUserArr[0]._id } , process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET , {expiresIn : '7d'})
            const cookieOptions = {
               httpOnly : true,
               secure : process.env.NODE_ENV === 'production',
               sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
               path: '/',
            }
            // set refresh token as httpOnly cookie
            res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            // optionally set access token in cookie for convenience
            res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
            console.log('Issued tokens for user', ourUserArr[0]._id)
            return res.status(200).json({
               message: 'Login successful',
               userData: {
                  _id: ourUserArr[0]._id,
                  name: ourUserArr[0].name,
                  email: ourUserArr[0].email,
                  profilepic: ourUserArr[0].profilepic,
                  provider: ourUserArr[0].provider
               }, accessToken
            })
      }return res.status(401).send(`Password is Incorrect`)
   }catch(err){
      console.log(err.message)
      return res.status(500).send(`Internal Server Error`)
   }
})
auth.post('/signup' , async (req , res) => {
   const { name , email , password } = req.body
   if (!email || !password || !name) return res.status(400).send(`Bad Request`)
   try{
      const hashedPassword = await bcrypt.hash(password , 10)
      const newUser = new User({name , email , password : hashedPassword})
      const savedUser = await newUser.save()
      console.log(savedUser)
      return res.status(201).json({
         message: 'User created successfully',
         userData: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            profilepic: savedUser.profilepic,
            provider: savedUser.provider
         }
      })
   }catch(err){
      console.log(err.message)
      return res.status(500).send(`Internal Server Error`)
   }
})

   // Refresh endpoint - issues a new access token when a valid refresh token cookie is present
   auth.get('/refresh', async (req, res) => {
      try {
         const refreshToken = req.cookies && req.cookies.refreshToken;
         if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
         const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET);
         const user = await User.findById(payload._id);
         if (!user) return res.status(401).json({ message: 'User not found' });

         const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
         const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
         };
         res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
         return res.status(200).json({ accessToken });
      } catch (err) {
         console.error('Refresh error:', err.message);
         return res.status(401).json({ message: 'Invalid refresh token' });
      }
   });

// Check if user is authenticated
auth.get('/me', userAuthCheck, async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
         message: 'User authenticated',
         user: user
      });
   } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
   }
});

auth.get('/profile', userAuthCheck, async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
         message: 'Profile retrieved successfully',
         user: user
      });
   } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
   }
});

auth.put('/profile', userAuthCheck, async (req, res) => {
   try {
      const { name, email, profilepic } = req.body;
      const userId = req.user._id;

      if (email && email !== req.user.email) {
         const existingUser = await User.findOne({ email, _id: { $ne: userId } });
         if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
         }
      }

      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (profilepic) updateFields.profilepic = profilepic;

      const updatedUser = await User.findByIdAndUpdate(
         userId,
         updateFields,
         { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
         return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
         message: 'Profile updated successfully',
         user: updatedUser
      });
   } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
   }
});

auth.put('/change-password', userAuthCheck, async (req, res) => {
   try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
         return res.status(400).json({ message: 'Current password and new password are required' });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      if (!user.password) {
         return res.status(400).json({ message: 'Cannot change password for social login accounts' });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
         return res.status(401).json({ message: 'Current password is incorrect' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(req.user._id, { password: hashedNewPassword });
      return res.status(200).json({ message: 'Password changed successfully' });
   } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
   }
});

auth.post('/logout' , async (req , res) => {
   const cookieOptions = {
      httpOnly : true,
      secure : process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
   }
   res.clearCookie('refreshToken', cookieOptions)
   res.clearCookie('accessToken', cookieOptions)
   return res.status(200).send('User Logout Successfully')
})

module.exports = auth