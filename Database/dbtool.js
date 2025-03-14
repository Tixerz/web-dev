const sqlite3 = require('sqlite3');
let sql;

//connect the db to the file
const db = new sqlite3.Database("./test.db" , sqlite3.OPEN_READWRITE , (err)=>{
    if(err)  return console.log(err.message);
});

//make a user table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY , username , password , email)` ;
// db.run(sql , (err)=>{
//     if(err) return console.log(err.message );
// });
// db.close();

function create_table(db_string ){
    let db = new sqlite3.Database(db_string , sqlite3.OPEN_READWRITE , (err) => {
        if(err) return console.log(err.message);
    });
    db.run(`CREATE TABLE users(id INTEGER PRIMARY KEY , username , password , email)` , (err) => {
        if(err) return console.log(err.message);
    });
    db.close();
}
function drop_table(db_string , table){
    let db = new sqlite3.Database(db_string , sqlite3.OPEN_READWRITE , (err) => {
        if(err) return console.log(err.message);
    });
    db.run(`DROP TABLE ${table}`);
    db.close();
}

function add_user(db_string , username , password , email){
    let db = new sqlite3.Database(db_string , sqlite3.OPEN_READWRITE , (err) => {
        if(err) return console.log(err.message);
    });
    db.run(`INSERT INTO users (username , password , email) VALUES (? ,? ,? )` , [username , password , email] , err=>{
        if(err) return console.log(err.message);
        console.log(`created the user ${username}`);
    });
    db.close();

}

function delete_user(db_string , id){
    let db = new sqlite3.Database(db_string , sqlite3.OPEN_READWRITE , (err) => {
        if(err) return console.log(err.message);
    });
    db.run(`DELETE FROM users WHERE id = ?` , id , err=>{
        if(err) return console.log(err.message);
        console.log(`deleted the user ${id}`);
    });
    db.close();
}


function  search_user(db_string , username){
    return new Promise((resolve , reject) => {
        let db = new sqlite3.Database(db_string , sqlite3.OPEN_READWRITE , (err) => {
            if(err) return console.log(err.message);
        });
        db.get(`SELECT * FROM users WHERE username = ?  ` , [username] , (err , row)=>{
            if(err) throw err;
            if(row){
                console.log(row); 
                db.close();
                resolve(row);
            }else{
                console.log("no user found");
                db.close();
                reject(row);
            }
        });
    });
}

module.exports = {
    add_user ,
    search_user , 
    delete_user
}
