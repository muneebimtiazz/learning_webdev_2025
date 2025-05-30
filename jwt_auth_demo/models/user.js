const mongoose =require('mongoose');
const Schema =mongoose.Schema
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')

const userSchema = new Schema({
   Email: {
    type: String,
    required:[true,'please enter your email'],
    unique:true,
    lowercase:true,
    validate:[isEmail,'please enter valid email']},

    Password: {
    type: String,
    required:[true,'please enter your password'],
    minlength:[6,'password must be of length 6 characters']},
})

//function will run before 
userSchema.post('save',(doc,next)=>{
    console.log('new user was created and saved',doc)
    next();
})

//function will run after
// userSchema.pre('save',function(doc,next){
//     console.log('new user is about to created and saved',this)
//     next();
// })

//bcrypt salt generation and save to db
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.Password=await bcrypt.hash(this.Password,salt);
    next();
})

userSchema.statics.login=async function(Email,Password){
    const user=await this.findOne({Email})
    if(user){
        let auth=await bcrypt.compare(Password,user.Password)
        if(auth){
            return (user);
        }
            throw Error('Password is incorrect')
    }
    throw Error('Email is not found')
}

const user= mongoose.model('userdetail', userSchema );
module.exports=user;