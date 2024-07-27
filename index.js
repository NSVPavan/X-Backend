const exp = require('constants');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
let app = express();

const port = 3000;

// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'posts',
    password: 'Password1!'
});
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});

app.get('/posts',(req,res)=>{
    try{
        connection.query("SELECT * FROM post",(err,result)=>{
            let posts = result;
            res.render("index.ejs",{posts});
        });
    }
    catch(err){
        console.log(err);
        res.send('some error occurred :(');
    }
});

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
});

app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    let q = "INSERT INTO post (id,username,content) VALUES (?,?,?)";
    let newpost = [id,username,content];
    try{
        connection.query(q,newpost,(err,result)=>{
            console.log("Added new post!");
            res.redirect('/posts');
        })
    }
    catch(err){
        res.send("Some error occured :(");
    }
});

app.get('/posts/:id',(req,res)=>{
    let { id }=req.params;
    let q = "SELECT * FROM post WHERE id = ?";
    try{
        connection.query(q,id,(err,result)=>{
            let post = result[0];
            res.render('show.ejs',{post});
        })
    }
    catch(err){
        res.send("Some error occured :(");
    }
});
app.get('/posts/edit/:id',(req,res)=>{
    let {id}=req.params;
    let q = "SELECT * FROM post WHERE id = ?";
    try{
        connection.query(q,id,(err,result)=>{
            let post = result[0];
            res.render('edit.ejs',{post});
        })
    }
    catch(err){
        res.send("Some error occured :(");
    }
});
app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    let q = "UPDATE post SET content = ? WHERE id = ?";
    let details = [newContent,id];
    try{
        connection.query(q,details,(err,result)=>{
            console.log("Edit successful!");
            res.redirect('/posts');
        })
    }
    catch(err){
        res.send("Some error occured :(");
    }
});
app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let q = "DELETE FROM post WHERE id = ?";
    try{
        connection.query(q,id,(err,result)=>{
            console.log("Post deleted successfully!");
            res.redirect('/posts');
        })
    }
    catch(err){
        res.send("Some error occured :(");
    }
})