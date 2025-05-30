const jwt=require('jsonwebtoken')

// const requireAuth=(req,res,next)=>{
//     let token=req.cookies.jwt
//     if(token){
//         jwt.verify(token,'onepiece',(err,decodedToken)=>{
//             if(err){
//                 res.redirect('/login')
//             }else{
//                 console.log(decodedToken)
//                 next()
//             }
//         })
//     }else{
//         res.redirect('/login')
//     }

// }




const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'onepiece', (err, decodedToken) => {
            if (err) {
                console.log('JWT verification error:', err);
                res.redirect('/login');
            } else {
                console.log('Decoded token:', decodedToken);
                next();
            }
        });
    } else {
        console.log('No token found, redirecting to login');
        res.redirect('/login');
    }
};

module.exports = requireAuth;

