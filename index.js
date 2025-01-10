//code sampled from https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-mysql tutorial
//type npm instal mysql2 to download mysql2 
//type node index.js in terminal to run 

//need to have these downloaded 
const express = require("express");
const mysql = require("mysql2");

//need to have mysql2 downloaded and password is whatever password used to download mysql (pls dont judge my password)
//database needs to be created and then added here
const db = mysql.createConnection({  host: "localhost",  user: "root",  password: "Pleaseletmein!24", database:"todolist"});

db.connect((err) => 
    {  if (err)
         {    throw err;  }  
    console.log("MySql Connected");}
);

const app = express();

//type "http://localhost:3001/createdb" into search bar to crete initially 
app.get("/createdb", (req, res) => 
    {  let sql = "CREATE DATABASE todolist";  
        db.query(sql, (err) => 
            {   if (err) {throw err;}    
                res.send("Database created");  
            }
        );
    }
);

//when 
app.listen("3001", () => 
    {  console.log("Server started on port 3001");}
);