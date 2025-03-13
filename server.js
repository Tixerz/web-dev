const path = require('path');
const express = require('express');
const PORT = 5000 ; 
const app  = express();

//middleware
app.use(express.json()); 


app.use(express.static(path.join(__dirname , 'public'))); 


app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname , 'public' , 'html-pages' , 'index.html'));
})

app.listen(PORT , "127.0.0.1" , (err)=>{
    if(err) return console.log("Failed to run the server");
    console.log("Listening on port" , PORT);
})