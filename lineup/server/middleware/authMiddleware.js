const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.userMiddleware = async(req,res,next) =>{
    let token;
    token = tokenvlidate(req);//getting token from header
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);//decoding header's token and verify it with key
        console.log(decoded);
        const user = await userModel.findById(decoded.id);//finding user in db
        if(!user){
            noUser(res);
        }else{
            req.user = user;
            next();
        }
    }
    catch(err){
        invalidUser(res,err);
    }
};

const tokenvlidate = (req) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        res.status(401).json({success:false,desc:'Not authorised'});
    }
    return token;
};

const noUser = (res) =>{
    res.status(400).json({success:false,desc:'No User found with this id'});
};

const invalidUser = (res,err) =>{
    res.status(401).json({success:false,desc:'somthing went wrong' +err});
};