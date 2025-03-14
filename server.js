const path = require('path');
const sqlite3 = require(`sqlite3`);
const express = require('express');
const {add_user , delete_user , search_user} = require("./Database/dbtool.js");



const PORT = 3000 ; 
const app  = express();

//middleware
app.use(express.json()); 


app.use(express.static(path.join(__dirname , 'public'))); 


app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname , 'public' , 'html-pages' , 'index.html'));
})

app.post('/login' , (req , res) => {
    console.log(JSON.stringify(req.body));
    
    
    search_user("./Database/test.db",req.body.email).then(data=>{
        
        return data;
            
    }).then(js => {
            
        if(js.password === req.body.password){
            res.send({status:`true `});
        }else{
             res.send({status:`false`});
         }
    }).catch(error=>{res.send({status:"user doesnt exist"})});
    
     
    
    // if(search_user("./Database/test.db" , JSON.stringify(req.body).email).password === JSON.stringify(req.body).password){
    //     res.send({status:"true"});
    // }else{
    //     res.send({status : "false"});
    // }
})


app.listen(PORT , "127.0.0.1" , (err)=>{
    if(err) return console.log("Failed to run the server");
    console.log("Listening on port" , PORT);
})