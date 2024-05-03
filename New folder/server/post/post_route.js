const express = require('express')
const router = express.Router();
const Post = require('./post')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const path = require('path')

const uploads = multer();
const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null, 'public/images')
   },
   filename: (req,file,cb)=>{
      cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname))
   }
})
const upload = multer({
   storage:storage
})


router.get('/listPost', async (req, res) => {
   
   try {
      const records = await Post.find({});
      res.json(records);
   } catch (err) {
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Error retrieving records' });
   }
});

router.post('/addPost',upload.single('file'), async (req,res)=>{
   try{
      const postId = uuidv4();
      const post = new Post({
         id: postId,
         title:req.body.title,
         text:req.body.text,
         images:req.file.filename,
         user_id:req.body.user_id,
         user_nom:req.body.user_nom,
         user_prenom:req.body.user_prenom
      });
   await post.save();
   
   }catch(err){
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Error retrieving records' });
   }
})

router.post('/:postId',uploads.none(), (req, res) => {
   const { postId } = req.params;
   const newComment = {
      nom_user:req.body.nom_user,
      prenom_user:req.body.prenom_user,
      comment:req.body.comment,
      post_id:postId
   };
   Post.findById(postId)
   .then((post) => {
      if (!post) {
         console.log('not found')
         return res.status(404).json({ error: 'Post not found' });
      }
      post.comments.push(newComment);
      return post.save();
   })
   .then((updatedPost) => {
      console.log('Comment added successfully');
      res.json(updatedPost);
   })
   .catch((error) => {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
   });
});

router.post('/like/:postId',async(req,res)=>{

   try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({ error: 'Post not found' });
      }

      // Increment the likes count and save the updated post
      post.likes += 1;
      await post.save();

      return res.json({ likes: post.likes });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
   }
});




module.exports = router