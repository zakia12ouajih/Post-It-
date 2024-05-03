const express = require('express')
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/React_Express_app',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, 
      serverSelectionTimeoutMS: 3000,
   },
)


const POSTShema = new mongoose.Schema({
   title:{
      type:String,
      required:true
   },
   user_id:String,
   user_nom:String,
   user_prenom:String,
   text:{
      type:String,
      required:true
   },
   images: [String],
   timestamp:{
      type:String,
      default: function() {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = String(currentDate.getFullYear());
      return `${day}/${month}/${year}`;
      }
   },
   likes:{
      type:Number,
      default: 0
   },
   comments:[
      {
         "comment": String,    // Comment text
         "nom_user": String,
         "prenom_user":String,
         "post_id":String
      }
   ]
})
const Post = mongoose.model('Post',POSTShema);



module.exports = Post

