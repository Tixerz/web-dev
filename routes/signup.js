const express = require('express');
const { add_user, delete_user, search_user } = require("../Database/dbtool.js");

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'html-pages', 'Sign up', 'sign-up.html'));
});
router.post('/', async (req, res) => {
    let user;
    await search_user("./Database/test.db", req.body.username).then(data => {
      user = data;
    }).catch(data => { user = data; });
  
    if (user == undefined) {
      //if username was available
      await add_user("./Database/test.db", req.body.username, req.body.password, " ");
      res.send({ status: "true" });
    } else {
      //if its not awvailable
      res.send({ status: "false" });
    }
});

module.exports = router;