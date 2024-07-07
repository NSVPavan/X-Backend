const express = require('express');
const path = require('path');
let app = express();

const port = 3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});

app.get('/posts',(req,res)=>{
    res.send('Handling get request');
})