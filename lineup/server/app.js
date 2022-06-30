
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');


//import routes
const userRoutes  = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app  = express();
const PORT = process.env.PORT;
const URI  = process.env.MONGO_URI;

mongoose.connect(URI,{
    useNewUrlParser    : true,
    useUnifiedTopology : true,
})
.then(()=>{
    console.log('Connected To MongoDB');
})
.catch((err)=>{
    console.log('Connection failed with error' +err);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});