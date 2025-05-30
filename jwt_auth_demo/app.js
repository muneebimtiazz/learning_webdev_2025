let express = require('express')
let mongoose = require('mongoose')
const detail=require('./models/anihub.js');
const authroutes= require('./routes/authroutes.js')
const cookieParser=require('cookie-parser')
const path = require('path');
const requireAuth = require('./middleware/jwtchecker.js');

//express setup
let app = express()
app.listen(3000)
//ejs setup
app.set('view engine','ejs')
//middleware 3rd party 
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())
// for styling
app.use(express.static('public'));

const db='mongodb+srv://muneeb123:test123@cluster0.cnswz.mongodb.net/Anihu?retryWrites=true&w=majority&appName=Cluster0'

console.log('Attempting to connect to MongoDB...');
mongoose.connect(db)
    .then(()=>{
        console.log('db sucessfully connected')
    })
    .catch((err)=>{
        console.log('db not connected'  , err)
    })

//main route
app.get('/',(req,res)=>{
    console.log(req.url)
    res.render('index.ejs' )
})

// database route
app.get('/dashboard',requireAuth,(req,res)=>{
    console.log(req.url);
    detail.find()
        .then((result)=>{
            console.log('Data retrieved from the database:');
            console.log(result); 
            res.render('dashboard',{array:result})

        })
        .catch((err)=>{
            console.log('err in getting data from database' , err)
        })
}) 

// database route
app.get('/dashboard/:id',(req,res)=>{
    const id= req.params.id;
    detail.findById(id)
        .then((result)=>{
            res.render('details',{dd:result})

        })
        .catch((err)=>{
            console.log('err in getting details from database')
        })
    
})


//cookie creation 
// using setHeader
// app.get('/setcookies',(req,res)=>{
//     res.setHeader('set-cookie','muneeb=true')
//     res.send('cookie is created')
// })

// using cookie parser
// app.get('/setcookies',(req,res)=>{
//     res.cookie('ahmed',false)
//     res.send('cookie is created')
// })
// app.get('/readcookies',(req,res)=>{
//     const cookie=req.cookies; //we can access all cookies and pass all cookies in a obj name cookie
//     res.json(cookie) //res on web
// })






app.use(authroutes)


// . is the current directory.
// .. refers to the parent directory.