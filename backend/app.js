const express =require('express');
const app = express();
const bodyParser = require("body-parser")
//Middleware
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
var PORT =process.env.PORT;
//connect to db
mongoose.connect(process.env.DB_CONNECT
,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>console.warn('connect to Db'));
//Import Routes
var listings =require('./routes/listing');
const userRoutes = require("./routes/User");
//Route Middleware
app.use('/api/listing',listings);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`app is listening to PORT ${PORT}`)
  })