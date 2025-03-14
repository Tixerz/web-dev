const path = require('path');
const sqlite3 = require(`sqlite3`);
const express = require('express');
const bycrypt = require('bcrypt');
const {add_user , delete_user , search_user} = require("./Database/dbtool.js");



const PORT = 3000 ; 
const app  = express();

//middleware
app.use(express.json()); 


app.use(express.static(path.join(__dirname , 'public'))); 


app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname , 'public' , 'html-pages' , 'index.html'));
})

//entry point for logging in
app.post('/login' , async (req , res) => {
    try{
        let user = await search_user("./Database/test.db",req.body.email);
        if(await bycrypt.compare(req.body.password , user.password)){
            res.send({status:`${user.password} ${req.body.password}`});
        }else{ 
            res.send({status:"false"});
        }
    }catch{
        res.status(500).send();
    }
    
});
    




app.listen(PORT , "127.0.0.1" , (err)=>{
    if(err) return console.log("Failed to run the server");
    console.log("Listening on port" , PORT);
});