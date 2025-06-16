//typical MVC (Model-View-Controller) pattern
//Create functions (controllers) that handle the business logic.
//Define routes (in authRoutes or other route files) that map incoming HTTP requests to those controller functions.



// here in authroutes we simply import those function we create in authcontrollers and give them a route where they should have run or call

//Router is a function
const { Router } = require('express')
const {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get
}= require('../controllers/authcontrollers');
//here we call that function
const router = Router();
// Create a new instance of the Router

router.get('/signup',signup_get)
router.get('/login',login_get)
router.post('/signup',signup_post)
router.post('/login',login_post)

router.get('/logout',logout_get)

module.exports=router