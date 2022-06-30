const userModel  = require('../models/userModel');

exports.login = async(req,res,next) =>{
    const {email,password} = req.body;
    let user = await userModel.findOne({email:email}).select('+password');
    if(!user){
        res.status(422).json({message : 'User Not found'});
    }
    else{
        try{
            const isMatch = await user.matchPasswords(password);
            if(!isMatch){
                res.status(401).send({success:false,desc:'Invalid'});
            }else{
                sendToken(user,200,res);
            }
        }
        catch(err){
            next(err);
        }
    }  
}

exports.register = async(req,res) =>{
    const {name,email,password,phone} = req.body;

    let existingEmail = await findEmailDuplicates(email,res);
    if(existingEmail === null){
        try{
            const user = await userModel.create({
                name,email,password,phone,
            });
            const token = await user.getSignedToken();
            res.status(201).json({success:true,token});
        }
        catch(err){
            res.status(500).json({success:false,desc:'Error'+err});
        }
    }
};

const findEmailDuplicates = async(email,res) =>{
    try{
        const existingAC = await userModel.findOne({email:email});
        if(existingAC){
            res.status(401).json({success:false,desc:'Already Exist'});
        }else{
            return existingAC;
        }
    }catch(err){
        res.status(422).json({success:false,desc:'Error'+err});
    }
};

const sendToken = (user, statuscode, res) => {
    const token = user.getSignedToken();
    res.status(statuscode).json({success:true,token,user});
};



