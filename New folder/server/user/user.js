const express = require('express')
const app = express()
const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({
   first_name:String,
   last_name:String,
   email:String,
   password:String
})


const User = mongoose.model('User',UserSchema);
module.exports = User

