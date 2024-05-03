const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});
app.use('/images', express.static('public/images'));

// DataBase Connection
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/React_Express_app',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, 
      serverSelectionTimeoutMS: 3000,
   },
)
.then(()=>console.log('connexion reussie '))
.catch((err)=>console.log('echoue',err));



//routers
const userRoute = require('./user/user_route')
const postRoute = require('./post/post_route')

//routes
app.use('/posts',postRoute)
app.use('/users',userRoute)

app.listen(3031,()=>{
   console.log('server working on 3031')
})