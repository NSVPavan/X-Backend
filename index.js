const exp = require('constants');
const express = require('express');
const path = require('path');
let app = express();

const port = 3000;

let posts=[
    {
        username: "Elon Musk",
        content: "I own twitter now... Oh! I mean X"
    },
    {
        username: "Elon Musk",
        content: "It's me again. Now you can get verified just by paying"
    },
    {
        username: "Mark Zuckerberg",
        content: "We are launching threads!!"
    }
];
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})