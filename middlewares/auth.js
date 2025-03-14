const jwt  = require('jsonwebtoken');

function authToken(req , res , next){
    const authHead = req.headers['authorization'];
    console.log(authHead);
    const token = authHead && authHead.split(' ')[1];
    console.log(token);
    if(token == null) return res.sendStatus(403);
    console.log(token);
    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        console.log(user);
        next();
    });
}
module.exports ={authToken};