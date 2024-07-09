const exp = require('constants');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
let app = express();

const port = 3000;

let posts=[
    {
        id: uuidv4(),
        username: "Elon Musk",
        content: "I own twitter now... Oh! I mean X"
    },
    {
        id: uuidv4(),
        username: "Elon Musk",
        content: "It's me again. Now you can get verified just by paying"
    },
    {
        id: uuidv4(),
        username: "Mark Zuckerberg",
        content: "We are launching threads!!"
    }
];
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
})

app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({username,content,id});
    res.redirect('/posts');
})