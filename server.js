const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sqlite3 = require(`sqlite3`);
const express = require('express');
const bycrypt = require('bcrypt');
const { add_user, delete_user, search_user } = require("./Database/dbtool.js");
const { authToken, genToken } = require("./middlewares/auth");

dotenv.config();

const PORT = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes
const signupRoute = require('./routes/signup.js');
const loginRoute = require('./routes/login.js');
const dashbordRoute = require('./routes/dashboard');

app.use('/signup' ,signupRoute );
app.use('/login' ,loginRoute );
app.use('/dashbord' , dashbordRoute);





app.listen(PORT, "127.0.0.1", (err) => {
  if (err) return console.log("Failed to run the server");
  console.log("Listening on port", PORT);
});
