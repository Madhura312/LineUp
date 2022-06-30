const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type     : String,
        required : [true, 'Please fill the username'],
    },
    email: {
        type     : String,
        required : [true, 'Please enter a email'],
        unique   : true,
        match    : [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please enter a valid email']
    },
    password: {
        type     : String,
        required : [true, 'Please enter a password'],
        minlength: 6,
        select   : false,
    },
    phone: {
        type     : String,
        required : [true, 'Please enter a contact number'],
        length   : 10,
        select   : false,
    },
});

//Converting plainpassword to hash before saving
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//for comparing password
UserSchema.methods.matchPasswords = async function(password){
    return bcrypt.compare(password,this.password);
};


UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

const Userschema = mongoose.model('Users',UserSchema);
module.exports = Userschema;