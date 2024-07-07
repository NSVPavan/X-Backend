const express = require('express');

let app = express();

const port = 3000;

app.set('view engine','ejs');
app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});

app.get('/posts',(req,res)=>{
    res.send('Handling get request');
})