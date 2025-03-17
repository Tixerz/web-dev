const express = require("express");
const router = express.Router();
const { authToken, genToken } = require("../middlewares/auth");


router.get('/', authToken, (req, res) => {
    res.sendStatus(200);
});


module.exports = router;