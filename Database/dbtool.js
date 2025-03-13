const sqlite3 = require('sqlite3');
let sql;

//connect the db to the file
const db = new sqlite3.Database("./test.db" , sqlite3.OPEN_READWRITE , (err)=>{
    if(err)  return console.log(err.message);
});

//make a user table
// sql = `CREATE TABLE users(id INTIGER PRIMARY KEY , username , password , email)` ;
// db.run(sql , (err)=>{
//     if(err) return console.log(err.message );
// });


