const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sqlite3 = require(`sqlite3`);
const express = require('express');
const bycrypt = require('bcrypt');
const {add_user , delete_user , search_user} = require("./Database/dbtool.js");
const {authToken , genToken} = require("./middlewares/auth");

dotenv.config();

const PORT = 3000 ; 
const app  = express();

//middleware
app.use(express.json()); 


app.use(express.static(path.join(__dirname , 'public'))); 


app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname , 'public' , 'html-pages' ,'Login', 'login.html'));
});
app.get('/signup' , (req, res) => {
    res.sendFile(path.join(__dirname , 'public' , 'html-pages' , 'Sign up','sign-up.html'));
})
//entry point for logging in
app.post('/login' , async (req , res) => {
    try{
        console.log(req.body.username);
        let user = await search_user("./Database/test.db",req.body.username);
        
        if(await bycrypt.compare(req.body.password , user.password)){
        
            res.send({status:`true` , token : genToken(req.body.username) });
        }else{ 
            res.send({status:"false"});
        }
    }catch{
        res.send({status:"false"});
    }
    
});

//gen a jwt 
// app.post('/genjwt' , (req , res)=> {
//     const tokenSec = process.env.JWT_SECRET_KEY;
//     let data = {
//         username : req.body.username , 
//         password  : req.body.password , 
//         email : req.body.email
//     };
//     const token = jwt.sign(data , tokenSec); 
//     res.send({token});
// })

app.listen(PORT , "127.0.0.1" , (err)=>{
    if(err) return console.log("Failed to run the server");
    console.log("Listening on port" , PORT);
});