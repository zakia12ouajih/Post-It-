const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");
const User = require('./user')


mongoose.connect('mongodb://127.0.0.1:27017/React_Express_app',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, 
      serverSelectionTimeoutMS: 3000,
   },
)


router.get('/',(req,res)=>{
   res.send('hello')
})

router.post('/createUser', async (req,res)=>{
   try{
      const user = new User({
         first_name:req.body.first_name,
         last_name:req.body.last_name,
         email:req.body.email,
         password:req.body.password
      });
   console.log(user)
   await user.save();
   }catch(err){
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Error retrieving records' });
   }
})


router.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
         if (user.password === password) {
            return res.json({ user }); // Return email and password from the user object upon successful login
         }
         return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(401).json({ error: 'User not found' }); // Return an error if user is not found
   } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

router.get('/listUser', async (req, res) => {
   
   try {
      const records = await User.find({});
      res.json(records);
   } catch (err) {
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Error retrieving records' });
   }
});



module.exports = router
