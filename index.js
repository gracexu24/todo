//code sampled from https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-mysql tutorial
//need nodejs, mysql downloaded 
//i dont rly know why but type npm init to set up the json file 
//type npm instal mysql2 to download mysql2 
//type node index.js in terminal to run <-- remember server needs to be running 

//need to have these downloaded 
const express = require("express");
const mysql = require("mysql2");

//keep track of id index 
//need to play around and see if there is a better way - causes a bit of a bug 
let id = 0; 

//need to have mysql2 downloaded and password is whatever password used to download mysql (pls dont judge my password)
//database needs to be created and then added here
const db = mysql.createConnection({  host: "localhost",  user: "root",  password: "Pleaseletmein!24", database:"todolist"});

db.connect((err) => 
    {  if (err)
         {    throw err;  }  
    console.log("MySql Connected");}
);

const app = express();
const cors = require("cors");
app.use(cors());

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

//when run, server will be made and running on local host 
app.listen("3001", () => 
    {  console.log("Server started on port 3001");}
);

//create table of tasks (the table is called tasks)
//id - id in table 
//task - text of the task 
//completed - 0 (incomplete), 1(complete)

app.get("/createtasks", (req, res) => 
    {  let sql =    "CREATE TABLE tasks(id INTEGER PRIMARY KEY, task VARCHAR(255), completed int)";  
        db.query(sql, (err) => {    
            if (err) {throw err}    
            res.send("Tasks table created");  
        });
    }
);

//adds a prespecified task
//!gotta edit this to connect w frontend and take in user input

//changed sent to json
app.get("/dohw", (req, res) => 
    {   let post = { id: id, task: "Do homework", completed: "0" };
        let sql = "INSERT INTO tasks SET ?";  
        id++;
        let query = db.query(sql, post, (err) => 
            {   if (err) {throw err;}    
                res.send("Task added");  });
    }
);

//complete task
//mark id (used to locate which task) as completed (changing 0 to 1)
app.get("/markcomplete/:id", (req, res) => 
    {   let comp = "1";  
        let sql = `UPDATE tasks SET completed = '${comp}' WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err) => {    
            if (err) {throw err;}    
            res.send("Post updated...");  
        });
    }
);

//delete task 
//use id to know which task 
app.get("/deletetask/:id", (req, res) => 
    {   let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`; 
        id--; 
        let query = db.query(sql, (err) => 
        {   if (err) {throw err;}    
            res.send("Task deleted");  
        });
    }
);

//attempt to display table? -https://www.w3schools.com/nodejs/nodejs_mysql_select.asp 
app.get("/displaytable", (req, res) => 
    {   let sql = 'SELECT * FROM tasks'; 
        let query = db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result); 
            res.send(result);  })
        
    }
);

//json
app.get("/displaytasks", (req, res) => 
    {   let sql = 'SELECT task FROM tasks'; 
        let query = db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result); 
            res.json(result);  })
        
    }
);
