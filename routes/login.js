const express = require("express");
const path = require("path");
const bycrypt = require('bcrypt');
const { add_user, delete_user, search_user } = require("../Database/dbtool.js");
const { authToken, genToken } = require("../middlewares/auth");
const router = express.Router();


router.get('/' , (req,res)=>{
    res.sendFile(path.join(__dirname ,".." , "public" ,'html-pages', "Login" , "login.html" ));
});

router.post('/', async (req, res) => {
    try {
      console.log(req.body.username);
      let user = await search_user('./Database/test.db', req.body.username);
      console.log("user : ",user);
  
      if (await bycrypt.compare(req.body.password, user.password)) {
  
        res.send({ status: `true`, token: genToken(req.body.username) });
      } else {
        res.send({ status: "false" });
      }
    } catch {
      res.send({ status: "false" });
    }
  
});

module.exports = router;