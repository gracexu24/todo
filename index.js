//code sampled from https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-mysql tutorial
//need nodejs, mysql downloaded 
//i dont rly know why but type npm init to set up the json file 
//type npm instal mysql2 to download mysql2 
//type node index.js in terminal to run <-- remember server needs to be running 

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
    {  let sql =    "CREATE TABLE tasks(id int AUTO_INCREMENT, task VARCHAR(255), completed int, PRIMARY KEY(id))";  
        db.query(sql, (err) => {    
            if (err) {throw err}    
            res.send("Tasks table created");  
        });
    }
);

//changed sent to json
app.get("/create/:task", (req, res) => 
    {   let post = { task: req.params.task, completed: "0" };
        let sql = "INSERT INTO tasks SET ?";  
        let query = db.query(sql, post, (err) => 
            {   if (err) {throw err;}    
                res.send("Task added");  });
    }
);

//complete task
//mark task as completed (changing 0 to 1)
app.get("/markcomplete/:task", (req, res) => 
    {   let comp = '1';
        const task = req.params.task;
        let sql = `UPDATE tasks SET completed = '${comp}' WHERE task = ?`;
        let query = db.query(sql, [task], (err) => {    
            if (err) {throw err;}    
            res.send("Post updated...");  
        });
    }
);

//delete task 
app.get("/deletetask/:task", (req, res) => 
    {   const task = req.params.task;
        let sql = `DELETE FROM tasks WHERE task = ?`; 
        let query = db.query(sql, [task], (err) => 
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
    {   let sql = 'SELECT task, completed FROM tasks'; 
        let query = db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result); 
            res.json(result);  })
        
    }
);