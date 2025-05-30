const user=require('../models/user')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
//1
export const signup_get=(req,res)=>{
    console.log(req.url);
    res.render('signup')
    
}
//2
export const login_get=(req,res)=>{
    res.render('login')
}

//handle error
const handleError=(err)=>{
    console.log(err.code,err.message);
    // console.log(err);
    let errors={Email:'',Password:''};

    if(err.code===11000){
        errors.Email='Email is already taken';
        return errors;
    }

    if(err.message.includes('Password is incorrect')){
        errors.Password='Password is incorrect'
        return errors
    }
    if(err.message.includes('Email is not found')){
        errors.Email='Email is incorrect'
        return errors
    }

    if(err.message.includes('userdetail validation failed')){
        
        // err.errors.path
        // err.errors.Email

        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
        return errors
    }
 
}


// creating a jwt token
const expirydate= 3*24*60*60;  //should be global
const sign=(id)=>{
    return jwt.sign({id},'onepiece',{
        expiresIn: expirydate
    })
}
// just for creating jwt on sigup and login
//to save in db

//3
export const signup_post=async (req,res)=>{
    const { Email, Password } = req.body;
try {
    const abc = await user.create({Email, Password});
    // sending jwt to that user 
    const token=sign(abc._id);
    res.cookie('jwt',token,{maxAge:expirydate*1000})
    res.status(200).json({id:abc._id});
} catch (err) {
    // console.log(err);
    const error= handleError(err);
    res.status(400).json({error});
}
    // res.send('signup')
}

//4
export const login_post=async (req,res)=>{
    let {Email,Password}=req.body;

    try{
        //self create a login method in user model
        const abc =await user.login(Email,Password);
        console.log(abc)// user correct return
        const token=sign(abc._id);
        res.cookie('jwt',token,{maxAge:expirydate*1000})
        res.status(200).json({id:abc._id})

    }
    catch (err){
        const error= handleError(err); //Email is not found , Password is incorrect
        res.status(400).json({error}); 
    }

    // res.send('login')
}
//5
export const logout_get=(req,res)=>{
        res.cookie('jwt','',{maxAge:1})
        res.redirect('/')
}


//nice approach
// export const logout = (req, res) => {
//     try {
//       res.cookie("jwt", "", { maxAge: 0 });
//       res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//       console.log("Error in logout controller", error.message);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };